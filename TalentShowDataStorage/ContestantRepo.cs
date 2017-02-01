using System;
using System.Collections.Generic;
using TalentShow;
using TalentShow.Repos;
using System.Data;
using TalentShowDataStorage.Helpers;
using TalentShow.CrossReferences;
using System.Linq;

namespace TalentShowDataStorage
{
    public class ContestantRepo : Repo<Contestant>, IRepo<Contestant>
    {
        private const string PERFORMANCEID = "performanceid";
        private const string CONTESTANTS = "contestants";

        protected override string GetTableName()
        {
            return CONTESTANTS;
        }
        
        protected override Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(Contestant contestant)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(PERFORMANCEID, contestant.Performance.Id);
            return fieldNamesAndValues;
        }

        protected override Contestant GetItemFromDataReader(IDataReader reader)
        {
            int id = Convert.ToInt32(reader.GetColumnValue(ID));
            int performanceId = Convert.ToInt32(reader.GetColumnValue(PERFORMANCEID));
            Performance performance = new PerformanceRepo().Get(performanceId);
            return new Contestant(id, performance);
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, PERFORMANCEID };
        }
    }
}
