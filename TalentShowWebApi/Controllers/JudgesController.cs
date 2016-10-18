using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TalentShow;
using TalentShowDataStorage;
using TalentShowWebApi.DataTransferObjects;

namespace TalentShowWebApi.Controllers
{
    [Authorize]
    public class JudgesController : ApiController
    {
        // GET api/Judges
        public IEnumerable<JudgeDto> Get()
        {
            return GetDtoFromJudges(new JudgeRepo().GetAll());
        }

        // GET api/Judges/5
        public JudgeDto Get(int id)
        {
            return GetDtoFromJudge(new JudgeRepo().Get(id));
        }

        // POST api/Judges
        public void Post([FromBody]JudgeDto judge)
        {
            new JudgeRepo().Add(GetJudgeFromDto(judge));
        }

        // PUT api/Judges/5
        public void Put([FromBody]JudgeDto judge)
        {
            new JudgeRepo().Update(GetJudgeFromDto(judge));
        }

        // DELETE api/Judges/5
        public void Delete(int id)
        {
            new JudgeRepo().Delete(id);
        }

        // DELETE api/Judges/5
        public void Delete([FromBody]JudgeDto judge)
        {
            new JudgeRepo().Delete(GetJudgeFromDto(judge));
        }

        // DELETE api/Judges/
        public void Delete()
        {
            new JudgeRepo().DeleteAll();
        }

        private Judge GetJudgeFromDto(JudgeDto judgeDto)
        {
            return new Judge(judgeDto.Id, GetPersonNameFromDto(judgeDto.Name), GetOrganizationFromDto(judgeDto.Affiliation));
        }

        private PersonName GetPersonNameFromDto(PersonNameDto nameDto)
        {
            return new PersonName(nameDto.Id, nameDto.FirstName, nameDto.LastName);
        }

        private Organization GetOrganizationFromDto(OrganizationDto organizationDto)
        {
            Organization parent = null;

            if (organizationDto.Parent != null)
                parent = GetOrganizationFromDto(organizationDto.Parent);

            return new Organization(organizationDto.Id, organizationDto.Name, parent);
        }

        private ICollection<JudgeDto> GetDtoFromJudges(ICollection<Judge> judges)
        {
            var dtos = new List<JudgeDto>();

            foreach (var judge in judges)
                dtos.Add(GetDtoFromJudge(judge));

            return dtos;
        }

        private JudgeDto GetDtoFromJudge(Judge judge)
        {
            return new JudgeDto() { Id = judge.Id, Name = GetDtoFromPersonName(judge.Name), Affiliation = GetDtoFromOrganization(judge.Affiliation) };
        }

        private PersonNameDto GetDtoFromPersonName(PersonName name)
        {
            return new PersonNameDto() { Id = name.Id, FirstName = name.FirstName, LastName = name.LastName };
        }

        private OrganizationDto GetDtoFromOrganization(Organization organization)
        {
            OrganizationDto parent = null;

            if (organization.Parent != null)
                parent = GetDtoFromOrganization(organization.Parent);

            return new OrganizationDto() { Id = organization.Id, Name = organization.Name, Parent = parent };
        }
    }
}
