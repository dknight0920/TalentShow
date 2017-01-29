using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
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
    public class ContestsController : ApiController
    {
        private IRepo<Contest> ContestRepo;
        private IRepo<ShowContest> ShowContestRepo;
        private ContestService ContestService;

        public ContestsController()
        {
            ContestRepo = new ContestRepo();
            ShowContestRepo = new ShowContestRepo();
            ContestService = new ContestService(ContestRepo, ShowContestRepo);
        }

        // GET api/Contests/ShowContests
        [Route("ShowContests")]
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        public IEnumerable<ContestDto> GetShowContests([FromUri]int id)
        {
            return ContestService.GetShowContests(id).ConvertToDto();
        }

        // GET api/Contests
        public IEnumerable<ContestDto> Get()
        {
            return ContestService.GetAll().ConvertToDto();
        }

        // GET api/Contests/5
        public ContestDto Get(int id)
        {
            return ContestService.Get(id).ConvertToDto();
        }

        // POST api/Contests
        public void Post([FromBody]ContestDto contest)
        {
            ContestService.Add(contest.ConvertFromDto());
        }

        // PUT api/Contests/5
        public void Put([FromBody]ContestDto contest)
        {
            ContestService.Update(contest.ConvertFromDto());
        }

        // DELETE api/Contests/5
        public void Delete(int id)
        {
            ContestService.Delete(id);
        }

        // DELETE api/Contests/5
        public void Delete([FromBody]ContestDto contest)
        {
            ContestService.Delete(contest.ConvertFromDto());
        }

        // DELETE api/Contests/
        public void Delete()
        {
            ContestService.DeleteAll();
        }
    }
}
