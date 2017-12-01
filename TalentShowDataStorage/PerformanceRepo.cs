using System;
using System.Collections.Generic;
using TalentShow;
using TalentShow.Repos;
using System.Data;
using TalentShowDataStorage.Helpers;

namespace TalentShowDataStorage
{
    public class PerformanceRepo : Repo<Performance>, IRepo<Performance>
    {
        private const string DESCRIPTION = "description";
        private const string DURATION = "duration";
        private const string PERFORMANCES = "performances";

        protected override string GetTableName()
        {
            return PERFORMANCES;
        }

        protected override Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(Performance performance)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(DESCRIPTION, performance.Description);
            fieldNamesAndValues.Add(DURATION, (performance.Duration != null ? performance.Duration.Ticks : 0));
            return fieldNamesAndValues;
        }

        protected override Performance GetItemFromDataReader(IDataReader reader)
        {
            int id = Convert.ToInt32(reader.GetColumnValue(ID));
            string description = reader.GetColumnValue(DESCRIPTION).ToString();
            TimeSpan duration = TimeSpan.FromTicks(Convert.ToInt64(reader.GetColumnValue(DURATION)));

            return new Performance(id, description, duration);
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, DESCRIPTION, DURATION };
        }

        protected override string GetForeignKeyFieldName()
        {
            return ID;
        }
    }
}
