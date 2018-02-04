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
        private const string RULE_VIOLATION_PENALTY = "ruleviolationpenalty";
        private const string TIE_BREAKER_POINTS = "tiebreakerpoints";
        private const string CONTESTANTS = "contestants";

        protected override string GetTableName()
        {
            return CONTESTANTS;
        }
        
        protected override Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(Contestant contestant)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(PERFORMANCEID, contestant.Performance.Id);
            fieldNamesAndValues.Add(RULE_VIOLATION_PENALTY, contestant.RuleViolationPenalty);
            fieldNamesAndValues.Add(TIE_BREAKER_POINTS, contestant.TieBreakerPoints);
            return fieldNamesAndValues;
        }

        protected override Contestant GetItemFromDataReader(IDataReader reader)
        {
            int id = Convert.ToInt32(reader.GetColumnValue(ID));
            int performanceId = Convert.ToInt32(reader.GetColumnValue(PERFORMANCEID));
            double? ruleViolationPenalty = reader.GetColumnValue(RULE_VIOLATION_PENALTY) as double?;
            double? tieBreakerPoints = reader.GetColumnValue(TIE_BREAKER_POINTS) as double?;
            Performance performance = new PerformanceRepo().Get(performanceId);
            return new Contestant(id, performance, ruleViolationPenalty ?? 0, tieBreakerPoints ?? 0);
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, PERFORMANCEID, RULE_VIOLATION_PENALTY, TIE_BREAKER_POINTS };
        }

        protected override string GetForeignKeyFieldName()
        {
            return PERFORMANCEID;
        }
    }
}
