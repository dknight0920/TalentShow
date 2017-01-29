using System;
using System.Collections.Generic;
using TalentShow;
using TalentShow.Repos;
using System.Data;
using TalentShowDataStorage.Helpers;
using TalentShow.CrossReferences;

namespace TalentShowDataStorage
{
    public class ContestantPerformerRepo : Repo<ContestantPerformer>, IRepo<ContestantPerformer>
    {
        private const string CONTESTANTID = "contestantid";
        private const string PERFORMERID = "performerid";
        private const string CONTESTANTPERFORMER = "contestantperformer";

        protected override string GetTableName()
        {
            return CONTESTANTPERFORMER;
        }

        protected override Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(ContestantPerformer contestantPerformer)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(CONTESTANTID, contestantPerformer.ContestantId);
            fieldNamesAndValues.Add(PERFORMERID, contestantPerformer.PerformerId);
            return fieldNamesAndValues;
        }

        protected override ContestantPerformer GetItemFromDataReader(IDataReader reader)
        {
            int id = Convert.ToInt32(reader.GetColumnValue(ID));
            int contestantId = Convert.ToInt32(reader.GetColumnValue(CONTESTANTID));
            int performerId = Convert.ToInt32(reader.GetColumnValue(PERFORMERID));

            return new ContestantPerformer(id, contestantId, performerId);
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, CONTESTANTID, PERFORMERID };
        }
    }
}
