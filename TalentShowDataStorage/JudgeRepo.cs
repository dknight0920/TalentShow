using System;
using System.Collections.Generic;
using TalentShow;
using TalentShow.Repos;
using System.Data;
using TalentShowDataStorage.Helpers;

namespace TalentShowDataStorage
{
    public class JudgeRepo : Repo<Judge>, IRepo<Judge>
    {
        private const string FIRSTNAME = "firstname";
        private const string LASTNAME = "lastname";
        private const string AFFILIATION = "affiliation";
        private const string JUDGES = "judges";

        protected override string GetTableName()
        {
            return JUDGES;
        }

        protected override Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(Judge judge)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(FIRSTNAME, judge.Name.FirstName);
            fieldNamesAndValues.Add(LASTNAME, judge.Name.LastName);
            fieldNamesAndValues.Add(AFFILIATION, judge.Affiliation);
            return fieldNamesAndValues;
        }

        protected override Judge GetItemFromDataReader(IDataReader reader)
        {
            int id = Convert.ToInt32(reader.GetColumnValue(ID));
            string firstName = reader.GetColumnValue(FIRSTNAME).ToString();
            string lastName = reader.GetColumnValue(LASTNAME).ToString();
            string affiliation = reader.GetColumnValue(AFFILIATION).ToString();

            PersonName name = new PersonName(firstName, lastName);
            return new Judge(id, name, affiliation);
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, FIRSTNAME, LASTNAME, AFFILIATION };
        }

        public void Delete(Judge judge)
        {
            Delete(judge.Id);
        }
    }
}
