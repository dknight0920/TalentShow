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
        private const string DIVISIONID = "divisionid";
        private const string PERSONNAMEID = "personnameid";
        private const string ORGANIZATIONID = "organizationid";
        private const string PERFORMERS = "performers";

        private const string CONTESTANT_ID = "contestantid";
        private const string VW_CONTESTANT_PERFORMERS = "vw_contestant_performers";

        protected override string GetTableName()
        {
            return PERFORMERS;
        }

        protected override Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(Performer performer)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(DIVISIONID, performer.Division.Id);
            fieldNamesAndValues.Add(PERSONNAMEID, performer.Name.Id);
            fieldNamesAndValues.Add(ORGANIZATIONID, (performer.Affiliation != null ? performer.Affiliation.Id : 0));
            return fieldNamesAndValues;
        }

        protected override Performer GetItemFromDataReader(IDataReader reader)
        {
            int id = Convert.ToInt32(reader.GetColumnValue(ID));
            int divisionId = Convert.ToInt32(reader.GetColumnValue(DIVISIONID));
            int personNameId = Convert.ToInt32(reader.GetColumnValue(PERSONNAMEID)); 
            int? organizationId = reader.GetColumnValue(ORGANIZATIONID) as int?;

            Division division = new DivisionRepo().Get(divisionId);

            PersonName name = new PersonNameRepo().Get(personNameId);

            Organization organization = null;

            if (organizationId != null && organizationId != 0)
                organization = new OrganizationRepo().Get((int)organizationId);

            return new Performer(id, division, name, organization);
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, DIVISIONID, PERSONNAMEID, ORGANIZATIONID };
        }

        protected override string GetForeignKeyFieldName()
        {
            return DIVISIONID;
        }

        protected override string GetViewName()
        {
            return VW_CONTESTANT_PERFORMERS;
        }

        protected override string GetParentForeignKeyFieldName()
        {
            return CONTESTANT_ID;
        }
    }
}
