using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.CrossReferences;
using TalentShow.Repos;

namespace TalentShow.Services
{
    public class ScoreCriterionService
    {
        private readonly IRepo<ScoreCriterion> ScoreCriterionRepo;
        private readonly ICrossReferenceRepo<ContestScoreCriterion> ContestScoreCriterionRepo;

        public ScoreCriterionService(IRepo<ScoreCriterion> scoreCriterionRepo, ICrossReferenceRepo<ContestScoreCriterion> contestScoreCriterionRepo)
        {
            if (scoreCriterionRepo == null)
                throw new ApplicationException("A ScoreCriterionService cannot be constructed without a ScoreCriterionRepo.");

            if (contestScoreCriterionRepo == null)
                throw new ApplicationException("A ScoreCriterionService cannot be constructed without an ContestScoreCriterionRepo.");

            ScoreCriterionRepo = scoreCriterionRepo;
            ContestScoreCriterionRepo = contestScoreCriterionRepo;
        }

        public ICollection<ScoreCriterion> GetContestScoreCriteria(int contestId)
        {
            var contestScoreCriterionCollection = ContestScoreCriterionRepo.GetMatchingOn(contestId);
            var scoreCriterions = new List<ScoreCriterion>();

            foreach (var cj in contestScoreCriterionCollection)
            {
                if (ScoreCriterionRepo.Exists(cj.ScoreCriterionId))
                    scoreCriterions.Add(ScoreCriterionRepo.Get(cj.ScoreCriterionId));
            }

            return scoreCriterions;
        }

        public void AddContestScoreCriterion(int contestId, ScoreCriterion scoreCriterion)
        {
            Add(scoreCriterion);
            ContestScoreCriterionRepo.Add(new ContestScoreCriterion(contestId, scoreCriterion.Id));
        }

        public ICollection<ScoreCriterion> GetAll()
        {
            return ScoreCriterionRepo.GetAll();
        }

        public bool Exists(int id)
        {
            return ScoreCriterionRepo.Exists(id);
        }

        public ScoreCriterion Get(int id)
        {
            return ScoreCriterionRepo.Get(id);
        }

        public void Add(ScoreCriterion scoreCriterion)
        {
            ScoreCriterionRepo.Add(scoreCriterion);
        }

        public void Update(ScoreCriterion scoreCriterion)
        {
            ScoreCriterionRepo.Update(scoreCriterion);
        }

        public void Delete(int id)
        {
            ScoreCriterionRepo.Delete(id);
        }

        public void Delete(ScoreCriterion scoreCriterion)
        {
            ScoreCriterionRepo.Delete(scoreCriterion);
        }

        public void DeleteAll()
        {
            ScoreCriterionRepo.DeleteAll();
        }
    }
}
