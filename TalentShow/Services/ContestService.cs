using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.CrossReferences;
using TalentShow.Repos;

namespace TalentShow.Services
{
    public class ContestService
    {
        private readonly IRepo<Contest> ContestRepo;
        private readonly IRepo<ShowContest> ShowContestRepo;

        public ContestService(IRepo<Contest> contestRepo, IRepo<ShowContest> showContestRepo)
        {
            if (contestRepo == null)
                throw new ApplicationException("A ContestService cannot be constructed without a ContestRepo.");
            if (showContestRepo == null)
                throw new ApplicationException("A ContestService cannot be constructed without a ShowContestRepo.");

            ContestRepo = contestRepo;
            ShowContestRepo = showContestRepo;
        }

        public ICollection<Contest> GetShowContests(int showId)
        {
            var showContestCollection = ShowContestRepo.GetAll().Where(sc => sc.ShowId == showId);
            var contests = new List<Contest>();

            foreach (var sc in showContestCollection)
                contests.Add(ContestRepo.Get(sc.ContestId));

            return ContestRepo.GetAll();
        }

        public ICollection<Contest> GetAll()
        {
            return ContestRepo.GetAll();
        }

        public Contest Get(int id)
        {
            return ContestRepo.Get(id);
        }

        public void Add(Contest contest)
        {
            ContestRepo.Add(contest);
        }

        public void Update(Contest contest)
        {
            ContestRepo.Update(contest);
        }

        public void Delete(int id)
        {
            ContestRepo.Delete(id);
        }

        public void Delete(Contest contest)
        {
            ContestRepo.Delete(contest);
        }

        public void DeleteAll()
        {
            ContestRepo.DeleteAll();
        }
    }
}
