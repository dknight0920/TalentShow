using System;
using System.Collections.Generic;
using TalentShow;
using TalentShow.Repos;
using System.Data;
using TalentShowDataStorage.Helpers;

namespace TalentShowDataStorage
{
    public class DivisionRepo : Repo<Division>, IRepo<Division>
    {
        private const string NAME = "name";
        private const string DIVISIONS = "divisions";

        protected override string GetTableName()
        {
            return DIVISIONS;
        }

        protected override Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(Division division)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(NAME, division.Name);
            return fieldNamesAndValues;
        }

        protected override Division GetItemFromDataReader(IDataReader reader)
        {
            int id = Convert.ToInt32(reader.GetColumnValue(ID));
            string name = reader.GetColumnValue(NAME).ToString();

            return new Division(id, name);
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, NAME };
        }

        protected override string GetForeignKeyFieldName()
        {
            return ID;
        }
    }
}
