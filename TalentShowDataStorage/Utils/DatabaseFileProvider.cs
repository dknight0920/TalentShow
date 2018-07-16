using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using TalentShowDataStorage.Helpers;
using TalentShowDataStorage.Utils.Models;

namespace TalentShowDataStorage.Utils
{
    public class DatabaseFileProvider
    {
        public ICollection<DatabaseFile> GetDatabaseFiles()
        {
            string sql = "SELECT name, physical_name, state_desc, (size * 8.0)*1000 AS size, CASE WHEN max_size = -1 THEN 9999999 ELSE (max_size * 8.0)*1000 END AS max_size FROM sys.database_files;";
            SqlCommand command = new SqlCommand(sql);
            IDataReader reader = SqlServerCommandHelper.ExecuteSqlQuery(command);

            var items = new List<DatabaseFile>();

            while (reader.Read())
            {
                items
                    .Add
                    (
                        new DatabaseFile
                        (
                            name:
                                reader.GetColumnValue("name").ToString(),
                            physicalFileName:
                                reader.GetColumnValue("physical_name").ToString(),
                            sizeInBytes:
                                Convert.ToInt64(reader.GetColumnValue("size")),
                            stateDesc:
                                reader.GetColumnValue("state_desc").ToString()
                        )
                    );
            }

            return items;
        }
    }
}
