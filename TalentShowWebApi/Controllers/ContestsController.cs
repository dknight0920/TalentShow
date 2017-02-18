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
        private readonly ContestService ContestService;

        public ContestsController()
        {
            ContestService = new ContestService(new ContestRepo(), new ShowContestRepo());
        }

        // GET api/Contests/Show/5
        [HttpGet]
        [Route("api/Contests/Show/{id}")]
        public IEnumerable<ContestDto> GetShowContests(int id)
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
        public ContestDto Post([FromBody]ContestDto contest)
        {
            var newContest = contest.ConvertFromDto();
            ContestService.Add(newContest);
            return newContest.ConvertToDto();
        }

        // POST api/Contests/Show/5
        [HttpPost]
        [Route("api/Contests/Show/{id}")]
        public ContestDto GetShowContests(int id, [FromBody]ContestDto contest)
        {
            var showId = id;
            var newContest = contest.ConvertFromDto();
            ContestService.AddShowContest(showId, newContest);
            return newContest.ConvertToDto();
        }

        // PUT api/Contests/5
        public ContestDto Put([FromBody]ContestDto contest)
        {
            var updatedContest = contest.ConvertFromDto();
            ContestService.Update(updatedContest);
            return updatedContest.ConvertToDto();
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
