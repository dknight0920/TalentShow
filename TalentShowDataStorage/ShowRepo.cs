using System;
using System.Collections.Generic;
using TalentShow;
using TalentShow.Repos;
using System.Data;
using TalentShowDataStorage.Helpers;

namespace TalentShowDataStorage
{
    public class ShowRepo : Repo<Show>, IRepo<Show>
    {
        private const string NAME = "name";
        private const string SHOWS = "shows";

        protected override string GetTableName()
        {
            return SHOWS;
        }

        protected override Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(Show show)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(NAME, show.Name);
            return fieldNamesAndValues;
        }

        protected override Show GetItemFromDataReader(IDataReader reader)
        {
            int id = Convert.ToInt32(reader.GetColumnValue(ID));
            string name = reader.GetColumnValue(NAME).ToString();

            return new Show(id, name);
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, NAME };
        }
    }
}
