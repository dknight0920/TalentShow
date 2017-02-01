using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.CrossReferences;
using TalentShow.Repos;

namespace TalentShow.Services
{
    public class ContestantService
    {
        private readonly IRepo<Contestant> ContestantRepo;
        private readonly IRepo<Performance> PerformanceRepo;
        private readonly ICrossReferenceRepo<ContestContestant> ContestContestantRepo;

        public ContestantService(IRepo<Contestant> contestantRepo, IRepo<Performance> performanceRepo, ICrossReferenceRepo<ContestContestant> contestContestantRepo)
        {
            if (contestantRepo == null)
                throw new ApplicationException("A " + this.GetType().Name + " cannot be constructed without a ContestantRepo.");
            if (performanceRepo == null)
                throw new ApplicationException("A " + this.GetType().Name + " cannot be constructed without a PerformanceRepo.");

            ContestantRepo = contestantRepo;
            PerformanceRepo = performanceRepo;
            ContestContestantRepo = contestContestantRepo;
        }

        public ICollection<Contestant> GetContestContestants(int contestId)
        {
            var contestContestantCollection = ContestContestantRepo.GetMatchingOn(contestId);
            var contestants = new List<Contestant>();

            foreach (var cc in contestContestantCollection)
                contestants.Add(ContestantRepo.Get(cc.ContestantId));

            return contestants;
        }

        public Contestant Get(int id)
        {
            return ContestantRepo.Get(id);
        }

        public ICollection<Contestant> GetAll()
        {
            return ContestantRepo.GetAll();
        }

        public void Add(Contestant contestant)
        {
            Validate(contestant);
            ContestantRepo.Add(contestant);
        }

        public void Update(Contestant contestant)
        {
            Validate(contestant);
            ContestantRepo.Update(contestant);
        }

        public void Delete(int id)
        {
            ContestantRepo.Delete(id);
        }

        public void Delete(Contestant contestant)
        {
            ContestantRepo.Delete(contestant);
        }

        public void DeleteAll()
        {
            ContestantRepo.DeleteAll();
        }

        private void Validate(Contestant contestant)
        {
            if (!PerformanceRepo.Exists(contestant.Performance.Id))
                throw new ApplicationException("The contestant cannot be added because its performance does not exist. Add the performance before adding the contestant.");
        }
    }
}
