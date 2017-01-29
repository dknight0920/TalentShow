using System;
using System.Collections.Generic;
using TalentShow.Repos;
using System.Data;
using TalentShowDataStorage.Helpers;
using TalentShow.CrossReferences;

namespace TalentShowDataStorage
{
    public class ShowContestRepo : Repo<ShowContest>, IRepo<ShowContest>
    {
        private const string SHOWID = "showid";
        private const string CONTESTID = "contestid";
        private const string SHOWCONTEST = "showcontest";

        protected override string GetTableName()
        {
            return SHOWCONTEST;
        }

        protected override Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(ShowContest showContest)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(SHOWID, showContest.ShowId);
            fieldNamesAndValues.Add(CONTESTID, showContest.ContestId);
            return fieldNamesAndValues;
        }

        protected override ShowContest GetItemFromDataReader(IDataReader reader)
        {
            int id = Convert.ToInt32(reader.GetColumnValue(ID));
            int showId = Convert.ToInt32(reader.GetColumnValue(SHOWID));
            int contestId = Convert.ToInt32(reader.GetColumnValue(CONTESTID));

            return new ShowContest(id, showId, contestId);
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, SHOWID, CONTESTID };
        }
    }
}