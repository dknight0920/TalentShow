using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.Repos;
using TalentShowDataStorage.Helpers;

namespace TalentShowDataStorage
{
    public class UserInUse : IInUse
    {
        public bool InUse(string userId)
        {
            string sql = "select 1 from vw_user_ids_in_use where userid = @userid";
            SqlCommand command = new SqlCommand(sql);
            command.Parameters.AddWithValue("@userid", userId);
            IDataReader reader = SqlServerCommandHelper.ExecuteSqlQuery(command);
            return reader.Read();
        }

        public bool InUse(int id)
        {
            throw new NotImplementedException();
        }
    }
}
