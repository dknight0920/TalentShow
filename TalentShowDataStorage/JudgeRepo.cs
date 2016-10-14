using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow;
using TalentShow.Repos;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json;
using System.Data.SqlClient;
using System.Data;
using TalentShowDataStorage.Helpers;

namespace TalentShowDataStorage
{
    public class JudgeRepo : Repo, IJudgeRepo
    {
        private const string ID = "id";
        private const string FIRSTNAME = "firstname";
        private const string LASTNAME = "lastname";
        private const string AFFILIATION = "affiliation";
        private const string JUDGES = "judges";

        public void Add(Judge judge)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(FIRSTNAME, judge.Name.FirstName);
            fieldNamesAndValues.Add(LASTNAME, judge.Name.LastName);
            fieldNamesAndValues.Add(AFFILIATION, judge.Affiliation);

            SqlCommand command = GetInsertCommand(JUDGES, fieldNamesAndValues);

            ExecuteSqlCommand(command);
        }

        public ICollection<Judge> GetAll()
        {
            string sql = GetSelectStatement() + ";";
            SqlCommand command = new SqlCommand(sql);
            IDataReader reader = ExecuteSqlQuery(command);

            var judges = new List<Judge>();

            while (reader.Read())
            {
                int id = Convert.ToInt32(reader.GetColumnValue(ID));
                string firstName = reader.GetColumnValue(FIRSTNAME).ToString();
                string lastName = reader.GetColumnValue(LASTNAME).ToString();
                string affiliation = reader.GetColumnValue(AFFILIATION).ToString();

                PersonName name = new PersonName(firstName, lastName);
                Judge judge = new Judge(id, name, affiliation);

                judges.Add(judge);
            }

            return judges;
        }

        public Judge Get(int id)
        {
            string sql = GetSelectStatement() + " where [" + ID + "] = @" + ID + ";";
            SqlCommand command = new SqlCommand(sql);
            command.Parameters.AddWithValue("@" + ID, id);
            IDataReader reader = ExecuteSqlQuery(command);

            Judge judge = null;

            if (reader.Read())
            {
                string firstName = reader.GetColumnValue(FIRSTNAME).ToString();
                string lastName = reader.GetColumnValue(LASTNAME).ToString();
                string affiliation = reader.GetColumnValue(AFFILIATION).ToString();

                PersonName name = new PersonName(firstName, lastName);
                judge = new Judge(id, name, affiliation);
            }

            return judge;
        }

        private static string GetSelectStatement()
        {
            return "select [" + ID + "],[" + FIRSTNAME + "],[" + LASTNAME + "],[" + AFFILIATION + "] from [" + JUDGES + "]";
        }
    }
}
