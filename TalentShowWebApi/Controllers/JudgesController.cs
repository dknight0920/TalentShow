using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TalentShow;
using TalentShow.Repos;
using TalentShow.Services;
using TalentShowDataStorage;
using TalentShowWebApi.DataTransferObjects;
using TalentShowWebApi.DataTransferObjects.Helpers;

namespace TalentShowWebApi.Controllers
{
    //[Authorize]
    public class JudgesController : ApiController
    {
        private IRepo<Judge> JudgeRepo;
        private JudgeService JudgeService;

        public JudgesController()
        {
            JudgeRepo = new JudgeRepo();
            JudgeService = new JudgeService(JudgeRepo, new PersonNameRepo(), new OrganizationRepo());
        }

        // GET api/Judges
        public IEnumerable<JudgeDto> Get()
        {
            return JudgeRepo.GetAll().ConvertToDto();
        }

        // GET api/Judges/5
        public JudgeDto Get(int id)
        {
            return JudgeRepo.Get(id).ConvertToDto();
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
            JudgeRepo.Delete(id);
        }

        // DELETE api/Judges/5
        public void Delete([FromBody]JudgeDto judge)
        {
            JudgeRepo.Delete(judge.ConvertFromDto());
        }

        // DELETE api/Judges/
        public void Delete()
        {
            JudgeRepo.DeleteAll();
        }
    }
}
