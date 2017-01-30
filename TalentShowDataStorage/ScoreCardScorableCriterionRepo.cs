using System;
using System.Collections.Generic;
using TalentShow;
using TalentShow.Repos;
using System.Data;
using TalentShowDataStorage.Helpers;
using TalentShow.CrossReferences;

namespace TalentShowDataStorage
{
    public class ScoreCardScorableCriterionRepo : CrossReferenceRepo<ScoreCardScorableCriterion>, ICrossReferenceRepo<ScoreCardScorableCriterion>
    {
        private const string SCORECARDID = "scorecardid";
        private const string SCORABLECRITERIONID = "scorablecriterionid";
        private const string SCORECARDSCORABLECRITERION = "scorecardscorablecriterion";

        protected override string GetTableName()
        {
            return SCORECARDSCORABLECRITERION;
        }

        protected override Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(ScoreCardScorableCriterion scoreCardScorableCriterion)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(SCORECARDID, scoreCardScorableCriterion.ScoreCardId);
            fieldNamesAndValues.Add(SCORABLECRITERIONID, scoreCardScorableCriterion.ScorableCriterionId);
            return fieldNamesAndValues;
        }

        protected override ScoreCardScorableCriterion GetItemFromDataReader(IDataReader reader)
        {
            int id = Convert.ToInt32(reader.GetColumnValue(ID));
            int scoreCardId = Convert.ToInt32(reader.GetColumnValue(SCORECARDID));
            int scorableCriterionId = Convert.ToInt32(reader.GetColumnValue(SCORABLECRITERIONID));

            return new ScoreCardScorableCriterion(id, scoreCardId, scorableCriterionId);
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, SCORECARDID, SCORABLECRITERIONID };
        }

        protected override string GetForeignKeyFieldName()
        {
            return SCORECARDID;
        }
    }
}