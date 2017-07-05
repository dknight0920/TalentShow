using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using TalentShow.Helpers;

namespace TalentShowDataStorage.Helpers
{
    public static class SqlServerCommandHelper
    {
        //private static string connectionString = @"Server=.\SQLEXPRESS;Database=TalentShow;User Id=TalentShowUser;Password=TalentShowPassword;";
        private static string connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

        public static int ExecuteSqlCommand(SqlCommand command, bool outputIdValue = false)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SetupCommandAndOpenConnection(command, connection);

                if(outputIdValue)
                    return (int)command.ExecuteScalar();
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
                ds.AcceptChanges();
                dt.AcceptChanges();
                return dt.CreateDataReader();
            }
        }

        private static void SetupCommandAndOpenConnection(SqlCommand command, SqlConnection connection)
        {
            command.Connection = connection;
            command.CommandTimeout = 0;
            connection.Open();
        }

        public static SqlCommand GetInsertCommand(string fileName, IDictionary<string, object> fieldNamesAndValues, string outputIdColumnName)
        {
            var fieldNames = GetFieldNames(fieldNamesAndValues);
            var fieldValues = GetFieldValues(fieldNamesAndValues);

            var sqlServerFieldNames = GetCollectOfSqlServerFieldNames(fieldNames);
            var sqlServerParameterNames = GetCollectionOfSqlServerParameterNames(fieldNames);

            string commandText = "insert into " + PutSquareBracesAroundSqlServerName(fileName) + " (" + sqlServerFieldNames.GetCommaDelimitedListOfString() + ")  output INSERTED." + outputIdColumnName + " values (" + sqlServerParameterNames.GetCommaDelimitedListOfString() + ");";

            var command = new SqlCommand(commandText);

            for (int i = 0; i < sqlServerParameterNames.Count; i++)
            {
                string parameterName = sqlServerParameterNames.ElementAt(i);
                object value = fieldValues.ElementAt(i);
                command.Parameters.AddWithValue(parameterName, value);
            }

            return command;
        }

        public static SqlCommand GetUpdateCommand(string fileName, IDictionary<string, object> fieldNamesAndValues, string parameterizedWhereClause, IDictionary<string, object> whereClauseParameterNamesAndValues)
        {
            var fieldNames = GetFieldNames(fieldNamesAndValues);
            var fieldValues = GetFieldValues(fieldNamesAndValues);
            var parameterNames = GetCollectionOfSqlServerParameterNames(fieldNames);
            var sqlServerFieldNames = GetCollectOfSqlServerFieldNames(fieldNames);

            var fieldAssignments = new List<string>();

            var command = new SqlCommand();

            for (int i = 0; i < sqlServerFieldNames.Count; i++)
            {
                string fieldName = sqlServerFieldNames.ElementAt(i);
                object fieldValue = fieldValues.ElementAt(i);
                string parameterName = parameterNames.ElementAt(i);

                fieldAssignments.Add(fieldName + "=" + parameterName);
                command.Parameters.AddWithValue(parameterName, fieldValue);
            }

            string commandText = "update " + PutSquareBracesAroundSqlServerName(fileName) + " set " + fieldAssignments.GetCommaDelimitedListOfString() + " " + parameterizedWhereClause;

            command.CommandText = commandText;

            for (int i = 0; i < whereClauseParameterNamesAndValues.Count; i++)
            {
                string parameterName = whereClauseParameterNamesAndValues.ElementAt(i).Key;
                object value = whereClauseParameterNamesAndValues.ElementAt(i).Value;
                command.Parameters.AddWithValue(parameterName, value);
            }

            return command;
        }

        public static string GetSimpleSelectStatement(string fileName, ICollection<string> fieldNames)
        {
            return "select " + GetCollectOfSqlServerFieldNames(fieldNames).GetCommaDelimitedListOfString() + " from " + PutSquareBracesAroundSqlServerName(fileName);
        }

        public static string GetSimpleDeleteStatement(string fileName)
        {
            return "delete from " + PutSquareBracesAroundSqlServerName(fileName);
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
