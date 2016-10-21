using System;
using System.Collections.Generic;
using TalentShow.Repos;
using System.Data;
using TalentShowDataStorage.Helpers;
using TalentShowDataStorage.CrossReferences;

namespace TalentShowDataStorage
{
    internal class ContestScoreCriterionRepo : Repo<ContestScoreCriterion>, IRepo<ContestScoreCriterion>
    {
        private const string CONTESTID = "contestid";
        private const string SCORECRITERIONID = "scorecriterionid";
        private const string CONTESTSCORECRITERION = "contestscorecriterion";

        protected override string GetTableName()
        {
            return CONTESTSCORECRITERION;
        }

        protected override Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(ContestScoreCriterion contestScoreCriterion)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(CONTESTID, contestScoreCriterion.ContestId);
            fieldNamesAndValues.Add(SCORECRITERIONID, contestScoreCriterion.ScoreCriterionId);
            return fieldNamesAndValues;
        }

        protected override ContestScoreCriterion GetItemFromDataReader(IDataReader reader)
        {
            int id = Convert.ToInt32(reader.GetColumnValue(ID));
            int contestId = Convert.ToInt32(reader.GetColumnValue(CONTESTID));
            int scoreCriterionId = Convert.ToInt32(reader.GetColumnValue(SCORECRITERIONID));

            return new ContestScoreCriterion(id, contestId, scoreCriterionId);
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, CONTESTID, SCORECRITERIONID };
        }
    }
}