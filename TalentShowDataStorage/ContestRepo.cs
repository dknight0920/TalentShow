﻿using System;
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
            AddContestContestant(contest);
            AddContestJudge(contest);
            AddContestScoreCriteria(contest);
            AddContestScoreCards(contest);
        }

        private static void AddContestContestant(Contest contest)
        {
            ContestContestantRepo contestContestantRepo = new ContestContestantRepo();

            foreach (Contestant contestant in contest.Contestants)
                contestContestantRepo.Add(new ContestContestant(contest.Id, contestant.Id));
        }

        private void AddContestJudge(Contest contest)
        {
            ContestJudgeRepo contestJudgeRepo = new ContestJudgeRepo();

            foreach (Judge judge in contest.Judges)
                contestJudgeRepo.Add(new ContestJudge(contest.Id, judge.Id));
        }

        private void AddContestScoreCriteria(Contest contest)
        {
            ContestScoreCriterionRepo contestScoreCriterionRepo = new ContestScoreCriterionRepo();

            foreach (ScoreCriterion scoreCriterion in contest.ScoreCriteria)
                contestScoreCriterionRepo.Add(new ContestScoreCriterion(contest.Id, scoreCriterion.Id));
        }

        private void AddContestScoreCards(Contest contest)
        {
            ContestScoreCardRepo contestScoreCardRepo = new ContestScoreCardRepo();

            foreach (ScoreCard scoreCard in contest.ScoreCards)
                contestScoreCardRepo.Add(new ContestScoreCard(contest.Id, scoreCard.Id));
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

            var contestContestantCollection = new ContestContestantRepo().GetAll().Where(cc => cc.ContestId == contest.Id);
            var contestantRepo = new ContestantRepo();

            foreach (var cc in contestContestantCollection)
                contest.Contestants.Add(contestantRepo.Get(cc.ContestantId));

            var contestJudgeCollection = new ContestJudgeRepo().GetAll().Where(cj => cj.ContestId == contest.Id);
            var judgeRepo = new JudgeRepo();

            foreach (var cj in contestJudgeCollection)
                contest.Judges.Add(judgeRepo.Get(cj.JudgeId));

            var contestScoreCardCollection = new ContestScoreCardRepo().GetAll().Where(sc => sc.ContestId == contest.Id);
            var scoreCardRepo = new ScoreCardRepo();

            foreach (var sc in contestScoreCardCollection)
                contest.ScoreCards.Add(scoreCardRepo.Get(sc.ScoreCardId));

            var contestScorCriterionCollection = new ContestScoreCriterionRepo().GetAll().Where(sc => sc.ContestId == contest.Id);
            var scoreCriterionRepo = new ScoreCriterionRepo();

            foreach (var sc in contestScorCriterionCollection)
                contest.ScoreCriteria.Add(scoreCriterionRepo.Get(sc.ScoreCriterionId));

            return contest;
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, NAME };
        }
    }
}