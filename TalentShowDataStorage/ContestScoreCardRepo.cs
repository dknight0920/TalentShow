using System;
using System.Collections.Generic;
using TalentShow;
using TalentShow.Repos;
using System.Data;
using TalentShowDataStorage.Helpers;
using TalentShow.CrossReferences;

namespace TalentShowDataStorage
{
    public class ContestScoreCardRepo : CrossReferenceRepo<ContestScoreCard>, ICrossReferenceRepo<ContestScoreCard>
    {
        private const string CONTESTID = "contestid";
        private const string SCORECARDID = "scorecardid";
        private const string CONTESTSCORECARD = "contestscorecard";

        protected override string GetTableName()
        {
            return CONTESTSCORECARD;
        }

        protected override Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(ContestScoreCard contestScoreCard)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(CONTESTID, contestScoreCard.ContestId);
            fieldNamesAndValues.Add(SCORECARDID, contestScoreCard.ScoreCardId);
            return fieldNamesAndValues;
        }

        protected override ContestScoreCard GetItemFromDataReader(IDataReader reader)
        {
            int id = Convert.ToInt32(reader.GetColumnValue(ID));
            int contestId = Convert.ToInt32(reader.GetColumnValue(CONTESTID));
            int scoreCardId = Convert.ToInt32(reader.GetColumnValue(SCORECARDID));

            return new ContestScoreCard(id, contestId, scoreCardId);
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, CONTESTID, SCORECARDID };
        }

        protected override string GetForeignKeyFieldName()
        {
            return CONTESTID;
        }
    }
}