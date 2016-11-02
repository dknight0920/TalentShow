using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.Repos;

namespace TalentShow.Services
{
    public class ContestantService
    {
        private readonly IRepo<Contestant> ContestantRepo;
        private readonly IRepo<Performer> PerformerRepo;
        private readonly IRepo<Performance> PerformanceRepo;

        public ContestantService(IRepo<Contestant> contestantRepo, IRepo<Performer> performerRepo, IRepo<Performance> performanceRepo)
        {
            if (contestantRepo == null)
                throw new ApplicationException("A " + this.GetType().Name + " cannot be constructed without a ContestantRepo.");
            if (performerRepo == null)
                throw new ApplicationException("A " + this.GetType().Name + " cannot be constructed without a PerformerRepo.");
            if (performanceRepo == null)
                throw new ApplicationException("A " + this.GetType().Name + " cannot be constructed without a PerformanceRepo.");

            ContestantRepo = contestantRepo;
            PerformerRepo = performerRepo;
            PerformanceRepo = performanceRepo;
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

        private void Validate(Contestant contestant)
        {
            if (contestant.Performers.Any(p => !PerformerRepo.Exists(p.Id)))
                throw new ApplicationException("The contestant cannot be added because it has performers that do not exist. Add the performers before adding the contestant.");
            if (!PerformanceRepo.Exists(contestant.Performance.Id))
                throw new ApplicationException("The contestant cannot be added because its performance does not exist. Add the performance before adding the contestant.");
        }
    }
}
