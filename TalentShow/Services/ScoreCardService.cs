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

        public ScoreCardService(IRepo<ScoreCard> scoreCardRepo, IRepo<ScorableCriterion> scorableCriterionRepo)
        {
            if (scoreCardRepo == null)
                throw new ApplicationException("A ScoreCardService cannot be constructed without a ScoreCardRepo.");
            if (scorableCriterionRepo == null)
                throw new ApplicationException("A ScoreCardService cannot be constructed without a ScorableCriterionRepo.");

            ScoreCardRepo = scoreCardRepo;
            ScorableCriterionRepo = scorableCriterionRepo;
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
            ScoreCardRepo.Update(scoreCard);
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
    }
}
