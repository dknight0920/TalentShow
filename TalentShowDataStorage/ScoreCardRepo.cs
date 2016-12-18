﻿using System;
using System.Collections.Generic;
using TalentShow;
using TalentShow.Repos;
using System.Data;
using TalentShowDataStorage.Helpers;
using TalentShowDataStorage.CrossReferences;
using System.Linq;

namespace TalentShowDataStorage
{
    public class ScoreCardRepo : Repo<ScoreCard>, IRepo<ScoreCard>
    {
        private const string CONTESTANTID = "contestantid";
        private const string JUDGEID = "judgeid";
        private const string SCORECARDS = "scorecards";

        protected override string GetTableName()
        {
            return SCORECARDS;
        }

        public override void Add(ScoreCard scoreCard)
        {
            base.Add(scoreCard);
            AddScoreCardScorableCriteria(scoreCard);
        }

        private static void AddScoreCardScorableCriteria(ScoreCard scoreCard)
        {
            ScoreCardScorableCriterionRepo repo = new ScoreCardScorableCriterionRepo();

            foreach (ScorableCriterion scorableCriterion in scoreCard.ScorableCriteria)
                repo.Add(new ScoreCardScorableCriterion(scoreCard.Id, scorableCriterion.Id));
        }

        protected override Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(ScoreCard scoreCard)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(CONTESTANTID, scoreCard.Contestant.Id);
            fieldNamesAndValues.Add(JUDGEID, scoreCard.Judge.Id);
            return fieldNamesAndValues;
        }

        protected override ScoreCard GetItemFromDataReader(IDataReader reader)
        {
            int id = Convert.ToInt32(reader.GetColumnValue(ID));
            int contestantId = Convert.ToInt32(reader.GetColumnValue(CONTESTANTID));
            int judgeId = Convert.ToInt32(reader.GetColumnValue(JUDGEID));

            Contestant contestant = new ContestantRepo().Get(contestantId);
            Judge judge = new JudgeRepo().Get(judgeId);
            ICollection<ScorableCriterion> scorableCriteria = new List<ScorableCriterion>();

            var scoreCardScorableCriterionCollection = new ScoreCardScorableCriterionRepo().GetAll().Where(sc => sc.ScoreCardId == id);
            var scorableCriterionRepo = new ScorableCriterionRepo();

            foreach (var scoreCardScorableCriterion in scoreCardScorableCriterionCollection)
                scorableCriteria.Add(scorableCriterionRepo.Get(scoreCardScorableCriterion.ScorableCriterionId));

            return new ScoreCard(id, contestant, judge, scorableCriteria);
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, CONTESTANTID, JUDGEID };
        }
    }
}