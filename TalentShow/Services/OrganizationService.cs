using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.CrossReferences;
using TalentShow.Repos;

namespace TalentShow.Services
{
    public class OrganizationService
    {
        private readonly IRepo<Organization> OrganizationRepo;

        public OrganizationService(IRepo<Organization> organizationRepo)
        {
            if (organizationRepo == null)
                throw new ApplicationException("A OrganizationService cannot be constructed without a OrganizationRepo.");

            OrganizationRepo = organizationRepo;
        }

        public ICollection<Organization> GetAll()
        {
            return OrganizationRepo.GetAll();
        }

        public Organization Get(int id)
        {
            return OrganizationRepo.Get(id);
        }

        public void Add(Organization organization)
        {
            Validate(organization);
            OrganizationRepo.Add(organization);
        }

        public void Update(Organization organization)
        {
            Validate(organization);
            OrganizationRepo.Update(organization);
        }

        public void Delete(int id)
        {
            OrganizationRepo.Delete(id);
        }

        public void Delete(Organization organization)
        {
            OrganizationRepo.Delete(organization);
        }

        public void DeleteAll()
        {
            OrganizationRepo.DeleteAll();
        }

        private void Validate(Organization organization)
        {
            if (organization.Parent != null && !OrganizationRepo.Exists(organization.Parent.Id))
                OrganizationRepo.Add(organization.Parent);
        }
    }
}
