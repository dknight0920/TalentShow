using System;
using System.Collections.Generic;
using TalentShow;
using TalentShow.Repos;
using System.Data;
using TalentShowDataStorage.Helpers;

namespace TalentShowDataStorage
{
    public class ScorableCriterionRepo : Repo<ScorableCriterion>, IRepo<ScorableCriterion>
    {
        private const string SCORECRITERIONID = "scorecriterionid";
        private const string SCORE = "score";
        private const string COMMENT = "comment";
        private const string SCORABLECRITERIA = "scorablecriteria";

        protected override string GetTableName()
        {
            return SCORABLECRITERIA;
        }

        protected override Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(ScorableCriterion scorableCriterion)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(SCORECRITERIONID, scorableCriterion.ScoreCriterion.Id);
            fieldNamesAndValues.Add(SCORE, scorableCriterion.Score);
            fieldNamesAndValues.Add(COMMENT, scorableCriterion.Comment);
            return fieldNamesAndValues;
        }

        protected override ScorableCriterion GetItemFromDataReader(IDataReader reader)
        {
            int id = Convert.ToInt32(reader.GetColumnValue(ID));
            int scoreCriterionId = Convert.ToInt32(reader.GetColumnValue(SCORECRITERIONID));
            double score = Convert.ToDouble(reader.GetColumnValue(SCORE));
            string comment = reader.GetColumnValue(COMMENT).ToString();

            ScoreCriterion scoreCriterion = new ScoreCriterionRepo().Get(scoreCriterionId);
            ScorableCriterion scorableCriterion = new ScorableCriterion(id, scoreCriterion);
            scorableCriterion.SetScoreAndComment(score, comment);

            return scorableCriterion;
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, SCORECRITERIONID, SCORE, COMMENT };
        }

        protected override string GetForeignKeyFieldName()
        {
            return SCORECRITERIONID;
        }
    }
}