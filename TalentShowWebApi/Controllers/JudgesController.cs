using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TalentShow;
using TalentShow.CrossReferences;
using TalentShow.Repos;
using TalentShow.Services;
using TalentShowDataStorage;
using TalentShowWebApi.DataTransferObjects;
using TalentShowWebApi.DataTransferObjects.Helpers;

namespace TalentShowWebApi.Controllers
{
    [Authorize]
    public class JudgesController : ApiController
    {
        private readonly JudgeService JudgeService;

        public JudgesController()
        {
            JudgeService = new JudgeService(new JudgeRepo(), new PersonNameRepo(), new OrganizationRepo(), new ContestJudgeRepo());
        }

        // GET api/Judges/Contest/5
        [HttpGet]
        [Route("api/Judges/Contest/{id}")]
        public IEnumerable<JudgeDto> GetContestJudges(int id)
        {
            return JudgeService.GetContestJudges(id).ConvertToDto();
        }

        // GET api/Judges
        public IEnumerable<JudgeDto> Get()
        {
            return JudgeService.GetAll().ConvertToDto();
        }

        // GET api/Judges/5
        public JudgeDto Get(int id)
        {
            return JudgeService.Get(id).ConvertToDto();
        }

        // POST api/Judges
        public void Post([FromBody]JudgeDto judge)
        {
            JudgeService.Add(judge.ConvertFromDto());
        }

        // PUT api/Judges/5
        public void Put([FromBody]JudgeDto judge)
        {
            JudgeService.Update(judge.ConvertFromDto());
        }

        // DELETE api/Judges/5
        public void Delete(int id)
        {
            JudgeService.Delete(id);
        }

        // DELETE api/Judges/5
        public void Delete([FromBody]JudgeDto judge)
        {
            JudgeService.Delete(judge.ConvertFromDto());
        }

        // DELETE api/Judges/
        public void Delete()
        {
            JudgeService.DeleteAll();
        }
    }
}
