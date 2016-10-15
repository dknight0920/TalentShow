using System;
using System.Collections.Generic;
using TalentShow;
using TalentShow.Repos;
using System.Data;
using TalentShowDataStorage.Helpers;

namespace TalentShowDataStorage
{
    public class PerformerRepo : Repo<Performer>, IRepo<Performer>
    {
        private const string DIVISION = "division";
        private const string PERSONNAMEID = "personnameid";
        private const string ORGANIZATIONID = "organizationid";
        private const string PERFORMERS = "performers";

        protected override string GetTableName()
        {
            return PERFORMERS;
        }

        protected override Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(Performer performer)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(DIVISION, Enum.GetName(typeof(Division), performer.Division));
            fieldNamesAndValues.Add(PERSONNAMEID, performer.Name.Id);
            fieldNamesAndValues.Add(ORGANIZATIONID, (performer.Affiliation != null ? performer.Affiliation.Id : 0));
            return fieldNamesAndValues;
        }

        protected override Performer GetItemFromDataReader(IDataReader reader)
        {
            int id = Convert.ToInt32(reader.GetColumnValue(ID));
            int personNameId = Convert.ToInt32(reader.GetColumnValue(PERSONNAMEID));
            Division division = (Division)Enum.Parse(typeof(Division), reader.GetColumnValue(DIVISION).ToString());
            int? organizationId = reader.GetColumnValue(ORGANIZATIONID) as int?;

            PersonName name = new PersonNameRepo().Get(personNameId);

            Organization organization = null;

            if (organizationId != null && organizationId != 0)
                organization = new OrganizationRepo().Get((int)organizationId);

            return new Performer(id, division, name, organization);
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, DIVISION, PERSONNAMEID, ORGANIZATIONID };
        }
    }
}
