using System;
using System.Collections.Generic;
using TalentShow;
using TalentShow.Repos;
using System.Data;
using TalentShowDataStorage.Helpers;

namespace TalentShowDataStorage
{
    public class PersonNameRepo : Repo<PersonName>, IRepo<PersonName>
    {
        private const string FIRSTNAME = "firstname";
        private const string LASTNAME = "lastname";
        private const string PERSONNAMES = "personnames";

        protected override string GetTableName()
        {
            return PERSONNAMES;
        }

        public override void Add(PersonName name)
        {
            name.SetId(AddItem(name));
        }

        protected override Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(PersonName name)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(FIRSTNAME, name.FirstName);
            fieldNamesAndValues.Add(LASTNAME, name.LastName);
            return fieldNamesAndValues;
        }

        protected override PersonName GetItemFromDataReader(IDataReader reader)
        {
            int id = Convert.ToInt32(reader.GetColumnValue(ID));
            string firstName = reader.GetColumnValue(FIRSTNAME).ToString();
            string lastName = reader.GetColumnValue(LASTNAME).ToString();

            return new PersonName(id, firstName, lastName);
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, FIRSTNAME, LASTNAME };
        }

        public override void Update(PersonName name)
        {
            Update(name, name.Id);
        }

        public void Delete(PersonName name)
        {
            Delete(name.Id);
        }
    }
}

