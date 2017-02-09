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

        public ScoreCardService(IRepo<ScoreCard> scoreCardRepo)
        {
            if (scoreCardRepo == null)
                throw new ApplicationException("A ScoreCardService cannot be constructed without a ScoreCardRepo.");

            ScoreCardRepo = scoreCardRepo;
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

        public ScoreCard Get(int id)
        {
            return ScoreCardRepo.Get(id);
        }

        public void Add(ScoreCard scoreCard)
        {
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
