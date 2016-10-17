using System;
using System.Collections.Generic;
using TalentShow;
using TalentShow.Repos;
using System.Data;
using TalentShowDataStorage.Helpers;
using System.Linq;
using TalentShowDataStorage.CrossReferences;

namespace TalentShowDataStorage
{
    public class ContestRepo : Repo<Contest>, IRepo<Contest>
    {
        private const string NAME = "name";
        private const string CONTESTS = "contests";

        protected override string GetTableName()
        {
            return CONTESTS;
        }

        public override void Add(Contest contest)
        {
            base.Add(contest);
            AddContestJudges(contest);
        }

        private static void AddContestJudges(Contest contest)
        {
            ContestJudgeRepo contestJudgeRepo = new ContestJudgeRepo();

            foreach (Judge judge in contest.Judges)
                contestJudgeRepo.Add(new ContestJudge(contest.Id, judge.Id));
        }

        protected override Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(Contest contest)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(NAME, contest.Name);
            return fieldNamesAndValues;
        }

        protected override Contest GetItemFromDataReader(IDataReader reader)
        {
            int id = Convert.ToInt32(reader.GetColumnValue(ID));
            string name = reader.GetColumnValue(NAME).ToString();

            Contest contest = new Contest(id, name);

            var contestJudgeCollection = new ContestJudgeRepo().GetAll().Where(cj => cj.ContestId == contest.Id);
            var judgeRepo = new JudgeRepo();

            foreach (var cj in contestJudgeCollection)
                contest.Judges.Add(judgeRepo.Get(cj.JudgeId));

            return contest;
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, NAME };
        }
    }
}