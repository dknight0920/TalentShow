using System;
using System.Collections.Generic;
using TalentShow;
using TalentShow.Repos;
using System.Data;
using TalentShowDataStorage.Helpers;

namespace TalentShowDataStorage
{
    public class OrganizationRepo : Repo<Organization>, IRepo<Organization>
    {
        private const string NAME = "name";
        private const string PARENTID = "parentid";
        private const string ORGANIZATIONS = "organizations";

        protected override string GetTableName()
        {
            return ORGANIZATIONS;
        }

        protected override Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(Organization organization)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(NAME, organization.Name);
            fieldNamesAndValues.Add(PARENTID, (organization.HasParent() ? organization.Parent.Id : 0));
            return fieldNamesAndValues;
        }

        protected override Organization GetItemFromDataReader(IDataReader reader)
        {
            int id = Convert.ToInt32(reader.GetColumnValue(ID));
            string name = reader.GetColumnValue(NAME).ToString();
            int? parentId = reader.GetColumnValue(PARENTID) as int?;

            Organization parent = null;

            if (parentId != null && parentId != 0)
                parent = Get((int)parentId);

            return new Organization(id, name, parent);
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, NAME, PARENTID };
        }
    }
}
