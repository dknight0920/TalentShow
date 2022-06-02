﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.CrossReferences;
using TalentShow.Repos;

namespace TalentShow.Services
{
    public class ScoreCardService
    {
        private readonly IRepo<ScoreCard> ScoreCardRepo;
        private readonly IRepo<ScorableCriterion> ScorableCriterionRepo;
        private readonly IRepo<Contestant> ContestantRepo;

        public ScoreCardService(IRepo<ScoreCard> scoreCardRepo, IRepo<ScorableCriterion> scorableCriterionRepo, IRepo<Contestant> contestantRepo)
        {
            if (scoreCardRepo == null)
                throw new ApplicationException("A ScoreCardService cannot be constructed without a ScoreCardRepo.");
            if (scorableCriterionRepo == null)
                throw new ApplicationException("A ScoreCardService cannot be constructed without a ScorableCriterionRepo.");
            if (contestantRepo == null)
                throw new ApplicationException("A ScoreCardService cannot be constructed without a ContestantRepo.");

            ScoreCardRepo = scoreCardRepo;
            ScorableCriterionRepo = scorableCriterionRepo;
            ContestantRepo = contestantRepo;
        }

        public ICollection<ScoreCard> GetContestantScoreCards(int contestantId)
        {
            return ScoreCardRepo.GetWhereForeignKeyIs(contestantId);
        }

        public ICollection<ScoreCard> GetAll()
        {
            return ScoreCardRepo.GetAll();
        }

        public bool Exists(int id)
        {
            return ScoreCardRepo.Exists(id);
        }

        public ScoreCard Get(int id)
        {
            return ScoreCardRepo.Get(id);
        }

        public void Add(ScoreCard scoreCard)
        {
            foreach (var scorableCriterion in scoreCard.ScorableCriteria)
            {
                if (scorableCriterion != null)
                    ScorableCriterionRepo.Add(scorableCriterion);
            }

            ScoreCardRepo.Add(scoreCard);
        }

        public void Update(ScoreCard scoreCard)
        {
            foreach (var scorableCriterion in scoreCard.ScorableCriteria)
            {
                if (scorableCriterion != null && ScorableCriterionRepo.Exists(scorableCriterion.Id))
                    ScorableCriterionRepo.Update(scorableCriterion);
            }

            ScoreCardRepo.Update(scoreCard);
        }

        public void AddOrUpdate(ScorableCriterion scorableCriterion)
        {
            if (ScorableCriterionRepo.Exists(scorableCriterion.Id))
                ScorableCriterionRepo.Update(scorableCriterion);
            else
                ScorableCriterionRepo.Add(scorableCriterion);
        }

        public void Delete(int id)
        {
            ScoreCardRepo.Delete(id);
        }

        public void Delete(ScoreCard scoreCard)
        {
            ScoreCardRepo.Delete(scoreCard);
        }

        public void DeleteAll()
        {
            ScoreCardRepo.DeleteAll();
        }

        public double GetContestantTotalScore(int contestantId, TimeSpan maxDuration)
        {  
            var contestant = ContestantRepo.Get(contestantId);
            return GetContestantTotalScore(contestant, maxDuration);
        }

        public double GetContestantTotalScore(Contestant contestant, TimeSpan maxDuration)
        {
            var scoreCards = GetContestantScoreCards(contestant.Id);

            var penaltyPoints = 0;

            if (contestant.Performance.Duration > maxDuration)
                penaltyPoints = Convert.ToInt32(Math.Floor((contestant.Performance.Duration - maxDuration).TotalSeconds));

            var totalScore = 0 - (penaltyPoints + contestant.RuleViolationPenalty) + contestant.TieBreakerPoints;

            foreach (var scoreCard in scoreCards)
                totalScore += scoreCard.TotalScore;

            //double lowestScore = 0;

            //var lowestScoreCard = scoreCards.OrderBy(s => s.TotalScore).FirstOrDefault();

            //if (lowestScoreCard != null)
                //lowestScore = lowestScoreCard.TotalScore;

            var finalScore = totalScore;// - lowestScore;

            //if (scoreCards != null && scoreCards.Count == 5)
            //{
            //    double highestScore = 0;

            //    var highestScoreCard = scoreCards.OrderByDescending(s => s.TotalScore).FirstOrDefault();

            //    if (highestScoreCard != null)
            //        highestScore = highestScoreCard.TotalScore;

            //    finalScore = finalScore - highestScore;
            //}

            return finalScore;
        }

        public void SetScore(ScoreCard scoreCard, int scoreCriterionId, double score, ScoreCriterionService scoreCriterionService)
        {
            if (scoreCard == null) return;

            if (scoreCard.ScorableCriteria == null || !scoreCard.ScorableCriteria.Any()) return;

            var scorableCriterion = scoreCard.ScorableCriteria.FirstOrDefault(s => s.ScoreCriterion.Id == scoreCriterionId);

            if (scorableCriterion == null)
            {
                scorableCriterion = new ScorableCriterion(0, scoreCriterionService.Get(scoreCriterionId));
                scorableCriterion.SetScore(score);
                scoreCard.ScorableCriteria.Add(scorableCriterion);
                Update(scoreCard);
            }
            else
            {
                scorableCriterion.SetScore(score);
                AddOrUpdate(scorableCriterion);
            }
        }

        public void SetComment(ScoreCard scoreCard, int scoreCriterionId, string comment, ScoreCriterionService scoreCriterionService)
        {
            if (scoreCard == null) return;

            if (scoreCard.ScorableCriteria == null || !scoreCard.ScorableCriteria.Any()) return;

            var scorableCriterion = scoreCard.ScorableCriteria.FirstOrDefault(s => s.ScoreCriterion.Id == scoreCriterionId);

            if (scorableCriterion == null)
            {
                scorableCriterion = new ScorableCriterion(0, scoreCriterionService.Get(scoreCriterionId));
                scorableCriterion.SetComment(comment);
                scoreCard.ScorableCriteria.Add(scorableCriterion);
                Update(scoreCard);
            }
            else
            {
                scorableCriterion.SetComment(comment);
                AddOrUpdate(scorableCriterion);
            }
        }
    }
}
