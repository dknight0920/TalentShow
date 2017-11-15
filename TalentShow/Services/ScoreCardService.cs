using System;
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
            var contestantScoreCardCollection = ScoreCardRepo.GetAll().Where(sc => sc.Contestant.Id == contestantId); //TODO optimize

            var scoreCards = new List<ScoreCard>();

            foreach (var scoreCard in contestantScoreCardCollection)
                scoreCards.Add(scoreCard);

            return scoreCards;
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

        public double GetContestantTotalScore(int contestantId)
        {
            var scoreCards = GetContestantScoreCards(contestantId);
            var contestant = ContestantRepo.Get(contestantId);
            var maxDuration = new TimeSpan(0, 5, 0); //five minutes

            double penaltyPoints = 0;

            if (contestant.Performance.Duration > maxDuration)
                penaltyPoints = (contestant.Performance.Duration - maxDuration).TotalSeconds;

            double totalScore = 0 - penaltyPoints;

            foreach (var scoreCard in scoreCards)
                totalScore += scoreCard.TotalScore;

            return totalScore;
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
    }
}
