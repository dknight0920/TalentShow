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
        private const string PERSONNAMEID = "personnameid";
        private const string AFFILIATION = "affiliation";
        private const string JUDGES = "judges";

        protected override string GetTableName()
        {
            return JUDGES;
        }

        public override void Add(Judge judge)
        {
            judge.SetId(AddItem(judge));
        }

        protected override Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(Judge judge)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(PERSONNAMEID, judge.Name.Id);
            fieldNamesAndValues.Add(AFFILIATION, judge.Affiliation);
            return fieldNamesAndValues;
        }

        protected override Judge GetItemFromDataReader(IDataReader reader)
        {
            int id = Convert.ToInt32(reader.GetColumnValue(ID));
            int personNameId = Convert.ToInt32(reader.GetColumnValue(PERSONNAMEID));
            string affiliation = reader.GetColumnValue(AFFILIATION).ToString();

            PersonName name = new PersonNameRepo().Get(personNameId);
            return new Judge(id, name, affiliation);
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, PERSONNAMEID, AFFILIATION };
        }

        public override void Update(Judge judge)
        {
            Update(judge, judge.Id);
        }

        public void Delete(Judge judge)
        {
            Delete(judge.Id);
        }
    }
}
