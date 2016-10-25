using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TalentShow;
using TalentShow.Services;
using TalentShowDataStorage;
using TalentShowWebApi.DataTransferObjects;
using TalentShowWebApi.DataTransferObjects.Helpers;

namespace TalentShowWebApi.Controllers
{
    [Authorize]
    public class JudgesController : ApiController
    {
        // GET api/Judges
        public IEnumerable<JudgeDto> Get()
        {
            return new JudgeRepo().GetAll().ConvertToDto();
        }

        // GET api/Judges/5
        public JudgeDto Get(int id)
        {
            return new JudgeRepo().Get(id).ConvertToDto();
        }

        // POST api/Judges
        public void Post([FromBody]JudgeDto judge)
        {
            var judgeService = new JudgeService(new JudgeRepo(), new PersonNameRepo(), new OrganizationRepo());
            judgeService.Add(judge.ConvertFromDto());
        }

        // PUT api/Judges/5
        public void Put([FromBody]JudgeDto judge)
        {
            new JudgeRepo().Update(judge.ConvertFromDto());
        }

        // DELETE api/Judges/5
        public void Delete(int id)
        {
            new JudgeRepo().Delete(id);
        }

        // DELETE api/Judges/5
        public void Delete([FromBody]JudgeDto judge)
        {
            new JudgeRepo().Delete(judge.ConvertFromDto());
        }

        // DELETE api/Judges/
        public void Delete()
        {
            new JudgeRepo().DeleteAll();
        }
    }
}
