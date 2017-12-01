using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using TalentShowDataStorage.Helpers;
using TalentShow.Repos;
using System;

namespace TalentShowDataStorage
{
    public abstract class Repo<T> where T : IIdentity
    {
        protected const string ID = "id";

        public virtual void Add(T item)
        {
            var fieldNamesAndValues = GetFieldNamesAndValuesForInsertOrUpdate(item);
            SqlCommand command = SqlServerCommandHelper.GetInsertCommand(GetTableName(), fieldNamesAndValues, ID);
            item.SetId( SqlServerCommandHelper.ExecuteSqlCommand(command, outputIdValue: true));
        }

        protected abstract string GetTableName();

        public virtual void Update(T item)
        {
            int id = item.Id;
            var fieldNamesAndValues = GetFieldNamesAndValuesForInsertOrUpdate(item);
            var whereClause = WhereIdEquals();
            var whereClauseParameterNamesAndValues = new Dictionary<string, object>();
            whereClauseParameterNamesAndValues.Add(ID, id);

            SqlCommand command = SqlServerCommandHelper.GetUpdateCommand(GetTableName(), fieldNamesAndValues, whereClause, whereClauseParameterNamesAndValues);
            SqlServerCommandHelper.ExecuteSqlCommand(command);

        }

        protected abstract Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(T item);

        public ICollection<T> GetAll()
        {
            string sql = GetSelectStatement() + ";";
            SqlCommand command = new SqlCommand(sql);
            IDataReader reader = SqlServerCommandHelper.ExecuteSqlQuery(command);

            var items = new List<T>();

            while (reader.Read())
            {
                T item = GetItemFromDataReader(reader);
                items.Add(item);
            }

            return items;
        }

        protected abstract T GetItemFromDataReader(IDataReader reader);

        public ICollection<T> GetWhereForeignKeyIs(int foreignKeyId)
        {
            string sql = GetSelectStatement() + WhereForeignKeyEquals() + ";";
            SqlCommand command = new SqlCommand(sql);
            AddForeignKeyIdParameterToCommand(command, foreignKeyId);
            IDataReader reader = SqlServerCommandHelper.ExecuteSqlQuery(command);

            var items = new List<T>();

            while (reader.Read())
            {
                T item = GetItemFromDataReader(reader);
                items.Add(item);
            }

            return items;
        }

        protected string WhereForeignKeyEquals()
        {
            string fieldName = GetForeignKeyFieldName();
            return " where [" + fieldName + "] = @" + fieldName + ";";
        }

        protected abstract string GetForeignKeyFieldName();

        public T Get(int id)
        {
            string sql = GetSelectStatement() + WhereIdEquals();
            SqlCommand command = new SqlCommand(sql);
            AddIdParameterToCommand(command, id);
            IDataReader reader = SqlServerCommandHelper.ExecuteSqlQuery(command);
            reader.Read();
            return GetItemFromDataReader(reader);
        }

        public bool Exists(int id)
        {
            string sql = "select 1 from " + GetTableName() + WhereIdEquals();
            SqlCommand command = new SqlCommand(sql);
            AddIdParameterToCommand(command, id);
            IDataReader reader = SqlServerCommandHelper.ExecuteSqlQuery(command);
            return reader.Read();
        }

        public void Delete(T item)
        {
            Delete(item.Id);
        }

        public void Delete(int id)
        {
            string sql = SqlServerCommandHelper.GetSimpleDeleteStatement(GetTableName()) + WhereIdEquals();
            SqlCommand command = new SqlCommand(sql);
            AddIdParameterToCommand(command, id);
            SqlServerCommandHelper.ExecuteSqlCommand(command);
        }

        public void DeleteAll()
        {
            string sql = SqlServerCommandHelper.GetSimpleDeleteStatement(GetTableName());
            SqlCommand command = new SqlCommand(sql);
            SqlServerCommandHelper.ExecuteSqlCommand(command);
        }

        protected string GetSelectStatement()
        {
            var fieldNames = GetFieldNamesForSelectStatement();
            return SqlServerCommandHelper.GetSimpleSelectStatement(GetTableName(), fieldNames);
        }

        private static void AddIdParameterToCommand(SqlCommand command, int id)
        {
            command.Parameters.AddWithValue("@" + ID, id);
        }

        private void AddForeignKeyIdParameterToCommand(SqlCommand command, int id)
        {
            command.Parameters.AddWithValue("@" + GetForeignKeyFieldName(), id);
        }

        protected abstract ICollection<string> GetFieldNamesForSelectStatement();

        private static string WhereIdEquals()
        {
            return " where [" + ID + "] = @" + ID + ";";
        }
    }
}
