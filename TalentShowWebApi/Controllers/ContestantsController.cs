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

        public ContestantsController()
        {
            ContestantService = new ContestantService(new ContestantRepo(), new PerformanceRepo(), new ContestContestantRepo());
        }

        // GET api/Contestants/Contest/5
        [HttpGet]
        [Route("api/Contestants/Contest/{id}")]
        public IEnumerable<ContestantDto> GetContestContestants(int id)
        {
            return ContestantService.GetContestContestants(id).ConvertToDto();
        }

        // GET api/Contestant
        public IEnumerable<ContestantDto> Get()
        {
            return ContestantService.GetAll().ConvertToDto();
        }

        // GET api/Contestant/5
        public HttpResponseMessage Get(int id)
        {
            if(ContestantService.Exists(id))
                return Request.CreateResponse(HttpStatusCode.OK, ContestantService.Get(id).ConvertToDto());

            return Request.CreateResponse(HttpStatusCode.NotFound);
        }

        // POST api/Contestant
        public void Post([FromBody]ContestantDto contestant)
        {
            ContestantService.Add(contestant.ConvertFromDto());
        }

        // PUT api/Contestant/5
        public void Put([FromBody]ContestantDto contestant)
        {
            ContestantService.Update(contestant.ConvertFromDto());
        }

        // DELETE api/Contestant/5
        public void Delete(int id)
        {
            ContestantService.Delete(id);
        }

        // DELETE api/Contestant/5
        public void Delete([FromBody]ContestantDto contestant)
        {
            ContestantService.Delete(contestant.ConvertFromDto());
        }

        // DELETE api/Contestant/
        public void Delete()
        {
            ContestantService.DeleteAll();
        }
    }
}
