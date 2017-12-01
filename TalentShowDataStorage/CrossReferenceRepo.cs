using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using TalentShowDataStorage.Helpers;
using TalentShow.Repos;

namespace TalentShowDataStorage
{
    public abstract class CrossReferenceRepo<T> : Repo<T> where T : IIdentity
    {
        public ICollection<T> GetMatchingOn(int foreignKeyId)
        {
            string sql = GetSelectStatement() + WhereForeignKeyEquals() + ";";
            SqlCommand command = new SqlCommand(sql);
            AddIdParameterToCommand(command, foreignKeyId);
            IDataReader reader = SqlServerCommandHelper.ExecuteSqlQuery(command);

            var items = new List<T>();

            while (reader.Read())
            {
                T item = GetItemFromDataReader(reader);
                items.Add(item);
            }

            return items;
        }

        private void AddIdParameterToCommand(SqlCommand command, int foreignKeyId)
        {
            command.Parameters.AddWithValue("@" + GetForeignKeyFieldName(), foreignKeyId);
        }
    }
}
