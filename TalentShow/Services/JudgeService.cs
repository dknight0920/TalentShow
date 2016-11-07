using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.Repos;

namespace TalentShow.Services
{
    public class JudgeService
    {
        private readonly IRepo<Judge> JudgeRepo;
        private readonly IRepo<PersonName> PersonNameRepo;
        private readonly IRepo<Organization> OrganizationRepo;

        public JudgeService(IRepo<Judge> judgeRepo, IRepo<PersonName> personNameRepo, IRepo<Organization> organizationRepo)
        {
            if (judgeRepo == null)
                throw new ApplicationException("A JudgeService cannot be constructed without a JudgeRepo.");
            if (personNameRepo == null)
                throw new ApplicationException("A JudgeService cannot be constructed without a PersonNameRepo.");
            if (organizationRepo == null)
                throw new ApplicationException("A JudgeService cannot be constructed without an OrganizationRepo.");

            JudgeRepo = judgeRepo;
            PersonNameRepo = personNameRepo;
            OrganizationRepo = organizationRepo;
        }

        public void Add(Judge judge)
        {
            Validate(judge);
            JudgeRepo.Add(judge);
        }

        public void Update(Judge judge)
        {
            Validate(judge);
            JudgeRepo.Update(judge);
        }

        private void Validate(Judge judge)
        {
            if (!PersonNameRepo.Exists(judge.Name.Id))
                PersonNameRepo.Add(judge.Name);
            if (!OrganizationRepo.Exists(judge.Affiliation.Id))
                OrganizationRepo.Add(judge.Affiliation);
        }
    }
}
