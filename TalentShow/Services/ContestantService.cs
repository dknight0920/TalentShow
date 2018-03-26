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
            return ContestantRepo.GetWhereParentForeignKeyIs(contestId);
        }

        public bool Exists(int id)
        {
            return ContestantRepo.Exists(id);
        }

        public Contestant Get(int id)
        {
            return ContestantRepo.Get(id);
        }

        public ICollection<Contestant> GetAll()
        {
            return ContestantRepo.GetAll();
        }

        public void AddContestContestant(int contestId, Contestant contestant)
        {
            Add(contestant);
            ContestContestantRepo.Add(new ContestContestant(contestId, contestant.Id));
        }

        public void Add(Contestant contestant)
        {
            AddOrUpdatePerformance(contestant.Performance);
            ContestantRepo.Add(contestant);
        }

        public void Update(Contestant contestant)
        {
            AddOrUpdatePerformance(contestant.Performance);
            ContestantRepo.Update(contestant);
        }

        public void UpdatePerformance(Performance performance)
        {
            PerformanceRepo.Update(performance);
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

        private void AddOrUpdatePerformance(Performance performance)
        {
            if (!PerformanceRepo.Exists(performance.Id))
                PerformanceRepo.Add(performance);
            else
                PerformanceRepo.Update(performance);
        }
    }
}
