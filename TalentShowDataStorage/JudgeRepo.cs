using System;
using System.Collections.Generic;
using TalentShow;
using TalentShow.Repos;
using System.Data;
using TalentShowDataStorage.Helpers;

namespace TalentShowDataStorage
{
    public class JudgeRepo : Repo<Judge>, IRepo<Judge>
    {
        private const string USERID = "userid";
        private const string JUDGES = "judges";

        protected override string GetTableName()
        {
            return JUDGES;
        }

        protected override Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(Judge judge)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(USERID, judge.UserId);
            return fieldNamesAndValues;
        }

        protected override Judge GetItemFromDataReader(IDataReader reader)
        {
            int id = Convert.ToInt32(reader.GetColumnValue(ID));
            string userId = reader.GetColumnValue(USERID).ToString();
            return new Judge(id, userId);
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, USERID };
        }
    }
}
