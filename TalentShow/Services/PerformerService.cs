using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.CrossReferences;
using TalentShow.Repos;

namespace TalentShow.Services
{
    public class PerformerService
    {
        private readonly IRepo<Performer> PerformerRepo;
        private readonly IRepo<Division> DivisionRepo;
        private readonly IRepo<PersonName> PersonNameRepo;
        private readonly IRepo<Organization> OrganizationRepo;
        private readonly ICrossReferenceRepo<ContestantPerformer> ContestantPerformerRepo;

        public PerformerService(IRepo<Performer> performerRepo, IRepo<Division> divisionRepo, IRepo<PersonName> personNameRepo, IRepo<Organization> organizationRepo, ICrossReferenceRepo<ContestantPerformer> contestantPerformerRepo)
        {
            if (performerRepo == null)
                throw new ApplicationException("A PerformerService cannot be constructed without a PerformerRepo.");
            if (divisionRepo == null)
                throw new ApplicationException("A PerformerService cannot be constructed without a DivisionRepo.");
            if (personNameRepo == null)
                throw new ApplicationException("A PerformerService cannot be constructed without a PersonNameRepo.");
            if (organizationRepo == null)
                throw new ApplicationException("A PerformerService cannot be constructed without an OrganizationRepo.");
            if (contestantPerformerRepo == null)
                throw new ApplicationException("A PerformerService cannot be constructed without an ContestantPerformerRepo.");

            PerformerRepo = performerRepo;
            DivisionRepo = divisionRepo;
            PersonNameRepo = personNameRepo;
            OrganizationRepo = organizationRepo;
            ContestantPerformerRepo = contestantPerformerRepo;
        }

        public ICollection<Performer> GetContestantPerformers(int contestantId)
        {
            return PerformerRepo.GetWhereParentForeignKeyIs(contestantId);
        }

        public void AddContestantPerformer(int contestantId, Performer performer)
        {
            Add(performer);
            ContestantPerformerRepo.Add(new ContestantPerformer(contestantId, performer.Id));
        }

        public ICollection<Performer> GetAll()
        {
            return PerformerRepo.GetAll();
        }

        public bool Exists(int id)
        {
            return PerformerRepo.Exists(id);
        }

        public Performer Get(int id)
        {
            return PerformerRepo.Get(id);
        }

        public void Add(Performer performer)
        {
            AddDivisionNameAndAffiliation(performer);
            PerformerRepo.Add(performer);
        }

        public void Update(Performer performer)
        {
            AddDivisionNameAndAffiliation(performer);
            UpdateDivisionNameAndAffiliation(performer);
            PerformerRepo.Update(performer);
        }

        public void Delete(int id)
        {
            PerformerRepo.Delete(id);
        }

        public void Delete(Performer performer)
        {
            PerformerRepo.Delete(performer);
        }

        public void DeleteAll()
        {
            PerformerRepo.DeleteAll();
        }

        private void AddDivisionNameAndAffiliation(Performer performer)
        {
            if (performer.Division != null && !DivisionRepo.Exists(performer.Division.Id))
                DivisionRepo.Add(performer.Division);
            if (performer.Name != null && !PersonNameRepo.Exists(performer.Name.Id))
                PersonNameRepo.Add(performer.Name);
            if (performer.Affiliation != null && !OrganizationRepo.Exists(performer.Affiliation.Id))
                OrganizationRepo.Add(performer.Affiliation);
        }

        private void UpdateDivisionNameAndAffiliation(Performer performer)
        {
            DivisionRepo.Update(performer.Division);
            PersonNameRepo.Update(performer.Name);
            OrganizationRepo.Update(performer.Affiliation);
        }
    }
}