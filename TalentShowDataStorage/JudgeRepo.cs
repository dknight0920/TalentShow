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
        private const string ORGANIZATIONID = "organizationid";
        private const string JUDGES = "judges";

        protected override string GetTableName()
        {
            return JUDGES;
        }

        protected override Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(Judge judge)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(PERSONNAMEID, judge.Name.Id);
            fieldNamesAndValues.Add(ORGANIZATIONID, (judge.Affiliation != null ? (int?)judge.Affiliation.Id : null));
            return fieldNamesAndValues;
        }

        protected override Judge GetItemFromDataReader(IDataReader reader)
        {
            int id = Convert.ToInt32(reader.GetColumnValue(ID));
            int personNameId = Convert.ToInt32(reader.GetColumnValue(PERSONNAMEID));
            int? organizationId = reader.GetColumnValue(ORGANIZATIONID) as int?;

            Organization organization = null;

            if (organizationId != null && organizationId != 0)
                organization = new OrganizationRepo().Get((int)organizationId);

            PersonName name = new PersonNameRepo().Get(personNameId);
            return new Judge(id, name, organization);
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, PERSONNAMEID, ORGANIZATIONID };
        }
    }
}
