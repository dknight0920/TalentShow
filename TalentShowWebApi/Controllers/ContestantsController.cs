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
    public class ContestantsController : ApiController
    {
        private readonly ContestantService ContestantService;
        private readonly ContestService ContestService;

        public ContestantsController()
        {
            ContestantService = new ContestantService(new ContestantRepo(), new PerformanceRepo(), new ContestContestantRepo());
            ContestService = new ContestService(new ContestRepo(), new ShowContestRepo());
        }

        // GET api/Contestants/Contest/5
        [HttpGet]
        [Route("api/Contestants/Contest/{id}")]
        public HttpResponseMessage GetContestContestants(int id)
        {
            if (ContestService.Exists(id))
                return Request.CreateResponse(HttpStatusCode.OK, ContestantService.GetContestContestants(id).ConvertToDto());

            return Request.CreateResponse(HttpStatusCode.NotFound);
        }

        // GET api/Contestants
        public IEnumerable<ContestantDto> Get()
        {
            return ContestantService.GetAll().ConvertToDto();
        }

        // GET api/Contestants/5
        public HttpResponseMessage Get(int id)
        {
            if(ContestantService.Exists(id))
                return Request.CreateResponse(HttpStatusCode.OK, ContestantService.Get(id).ConvertToDto());

            return Request.CreateResponse(HttpStatusCode.NotFound);
        }

        // POST api/Contestants
        public void Post([FromBody]ContestantDto contestant)
        {
            ContestantService.Add(contestant.ConvertFromDto());
        }

        // POST api/Contestants/Contest/5
        [HttpPost]
        [Route("api/Contestants/Contest/{id}")]
        public ContestantDto GetShowContests(int id, [FromBody]ContestantDto contestant)
        {
            var contestId = id;
            var newContestant = contestant.ConvertFromDto();
            ContestantService.AddContestContestant(contestId, newContestant);
            return newContestant.ConvertToDto();
        }

        // PUT api/Judges/5
        public ContestantDto Put([FromBody]ContestantDto contestant)
        {
            var updatedContestant = contestant.ConvertFromDto();
            ContestantService.Update(updatedContestant);
            return updatedContestant.ConvertToDto();
        }

        // DELETE api/Contestants/5
        public void Delete(int id)
        {
            ContestantService.Delete(id);
        }

        // DELETE api/Contestants/5
        public void Delete([FromBody]ContestantDto contestant)
        {
            ContestantService.Delete(contestant.ConvertFromDto());
        }

        // DELETE api/Contestants/
        public void Delete()
        {
            ContestantService.DeleteAll();
        }
    }
}
