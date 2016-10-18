using System;
using System.Collections.Generic;
using TalentShow;
using TalentShow.Repos;
using System.Data;
using TalentShowDataStorage.Helpers;

namespace TalentShowDataStorage
{
    public class ScoreCriterionRepo : Repo<ScoreCriterion>, IRepo<ScoreCriterion>
    {
        private const string DESCRIPTION = "description";
        private const string MIN = "min";
        private const string MAX = "max";
        private const string SCORECRITERIA = "scorecriteria";

        protected override string GetTableName()
        {
            return SCORECRITERIA;
        }

        protected override Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(ScoreCriterion scoreCriterion)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(DESCRIPTION, scoreCriterion.CriterionDescription);
            fieldNamesAndValues.Add(MIN, scoreCriterion.ScoreRange.Min);
            fieldNamesAndValues.Add(MAX, scoreCriterion.ScoreRange.Max);
            return fieldNamesAndValues;
        }

        protected override ScoreCriterion GetItemFromDataReader(IDataReader reader)
        {
            int id = Convert.ToInt32(reader.GetColumnValue(ID));
            string description = reader.GetColumnValue(DESCRIPTION).ToString();
            double min = Convert.ToDouble(reader.GetColumnValue(MIN));
            double max = Convert.ToDouble(reader.GetColumnValue(MAX));

            return new ScoreCriterion(id, description, new ScoreRange(min, max));
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, DESCRIPTION, MIN, MAX };
        }
    }
}
