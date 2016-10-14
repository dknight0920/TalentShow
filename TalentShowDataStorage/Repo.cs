using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.Helpers;

namespace TalentShowDataStorage
{
    public abstract class Repo
    {
        private static string connectionString = @"Server=.\SQLEXPRESS;Database=TalentShow;User Id=TalentShowUser;Password=TalentShowPassword;";

        public static int ExecuteSqlCommand(SqlCommand command)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SetupCommandAndOpenConnection(command, connection);
                return command.ExecuteNonQuery();
            }
        }

        public static IDataReader ExecuteSqlQuery(SqlCommand command)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SetupCommandAndOpenConnection(command, connection);
                DataSet ds = new DataSet();
                var dt = new DataTable();
                ds.Tables.Add(dt);
                ds.EnforceConstraints = false;
                var reader = command.ExecuteReader();
                dt.Load(reader);
                command.Dispose();
                return dt.CreateDataReader();
            }
        }

        private static void SetupCommandAndOpenConnection(SqlCommand command, SqlConnection connection)
        {
            command.Connection = connection;
            command.CommandTimeout = 0;
            connection.Open();
        }

        protected static SqlCommand GetInsertCommand(string fileName, IDictionary<string, object> fieldNamesAndValues)
        {
            var fieldNames = GetFieldNames(fieldNamesAndValues);
            var fieldValues = GetFieldValues(fieldNamesAndValues);

            var sqlServerFieldNames = GetCollectOfSqlServerFieldNames(fieldNames);
            var sqlServerParameterNames = GetCollectionOfSqlServerParameterNames(fieldNames);

            string commandText = "insert into " + PutSquareBracesAroundSqlServerName(fileName) + " (" + sqlServerFieldNames.GetCommaDelimitedListOfString() + ") values (" + sqlServerParameterNames.GetCommaDelimitedListOfString() + ");";

            var command = new SqlCommand(commandText);

            for(int i = 0; i < sqlServerParameterNames.Count; i++)
            {
                string parameterName = sqlServerParameterNames.ElementAt(i);
                object value = fieldValues.ElementAt(i);
                command.Parameters.AddWithValue(parameterName, value);
            }

            return command;
        }

        private static ICollection<string> GetFieldNames(IDictionary<string, object> fieldNamesAndValues)
        {
            var keys = new List<string>();

            foreach (var fieldName in fieldNamesAndValues)
                keys.Add(fieldName.Key);

            return keys;
        }

        private static ICollection<object> GetFieldValues(IDictionary<string, object> fieldNamesAndValues)
        {
            var values = new List<object>();

            foreach (var fieldName in fieldNamesAndValues)
                values.Add(fieldName.Value);

            return values;
        }

        private static ICollection<string> GetCollectOfSqlServerFieldNames(ICollection<string> fieldNames)
        {
            var sqlFieldNames = new List<string>();

            foreach (var fieldName in fieldNames)
                sqlFieldNames.Add(PutSquareBracesAroundSqlServerName(fieldName));

            return sqlFieldNames;
        }

        private static ICollection<string> GetCollectionOfSqlServerParameterNames(ICollection<string> fieldNames)
        {
            var parameters = new List<string>();

            foreach (var fieldName in fieldNames)
                parameters.Add("@" + fieldName);

            return parameters;
        }

        private static string PutSquareBracesAroundSqlServerName(string name)
        {
            return "[" + name + "]";
        }      
    }
}
