using System;
using System.Collections.Generic;
using TalentShow;
using TalentShow.Repos;
using System.Data;
using TalentShowDataStorage.Helpers;
using TalentShow.CrossReferences;

namespace TalentShowDataStorage
{
    public class ContestJudgeRepo : Repo<ContestJudge>, IRepo<ContestJudge>
    {
        private const string CONTESTID = "contestid";
        private const string JUDGEID = "judgeid";
        private const string CONTESTJUDGE = "contestjudge";

        protected override string GetTableName()
        {
            return CONTESTJUDGE;
        }

        protected override Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(ContestJudge contestJudge)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(CONTESTID, contestJudge.ContestId);
            fieldNamesAndValues.Add(JUDGEID, contestJudge.JudgeId);
            return fieldNamesAndValues;
        }

        protected override ContestJudge GetItemFromDataReader(IDataReader reader)
        {
            int id = Convert.ToInt32(reader.GetColumnValue(ID));
            int contestId = Convert.ToInt32(reader.GetColumnValue(CONTESTID));
            int judgeId = Convert.ToInt32(reader.GetColumnValue(JUDGEID));

            return new ContestJudge(id, contestId, judgeId);
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, CONTESTID, JUDGEID };
        }
    }
}
