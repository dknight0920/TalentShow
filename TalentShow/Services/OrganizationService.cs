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

        public bool Exists(int id)
        {
            return OrganizationRepo.Exists(id);
        }

        public Organization Get(int id)
        {
            return OrganizationRepo.Get(id);
        }

        public void Add(Organization organization)
        {
            AddParentOrganization(organization);
            OrganizationRepo.Add(organization);
        }

        public void Update(Organization organization)
        {
            AddParentOrganization(organization);
            OrganizationRepo.Update(organization);
        }

        public void Delete(int id)
        {
            if (!Exists(id)) return;

            var organization = Get(id);

            DeleteIncludingChildren(organization);
        }

        public void Delete(Organization organization)
        {
            DeleteIncludingChildren(organization);
        }

        private void DeleteIncludingChildren(Organization organization)
        {
            var organizations = GetAll().Where(o => o.Parent != null && o.Parent.Id == organization.Id);

            if (!organizations.Any()) {
                OrganizationRepo.Delete(organization);
                return;
            }

            foreach (var o in organizations)
                DeleteIncludingChildren(o);

            OrganizationRepo.Delete(organization);
        }

        public void DeleteAll()
        {
            OrganizationRepo.DeleteAll();
        }

        private void AddParentOrganization(Organization organization)
        {
            if (organization.Parent != null && !OrganizationRepo.Exists(organization.Parent.Id))
                OrganizationRepo.Add(organization.Parent);
        }
    }
}
