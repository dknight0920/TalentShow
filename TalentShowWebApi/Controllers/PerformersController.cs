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
    public class PerformersController : ApiController
    {
        private readonly PerformerService PerformerService;

        public PerformersController()
        {
            PerformerService = new PerformerService(new PerformerRepo(), 
                new DivisionRepo(), new PersonNameRepo(), new OrganizationRepo(), new ContestantPerformerRepo());
        }

        // GET api/Performers/Contestant/5
        [HttpGet]
        [Route("api/Performers/Contestant/{id}")]
        public IEnumerable<PerformerDto> GetContestantPerformers(int id)
        {
            return PerformerService.GetContestantPerformers(id).ConvertToDto();
        }

        // GET api/Performers
        public IEnumerable<PerformerDto> Get()
        {
            return PerformerService.GetAll().ConvertToDto();
        }

        // GET api/Performers/5
        public HttpResponseMessage Get(int id)
        {
            if (PerformerService.Exists(id))
                return Request.CreateResponse(HttpStatusCode.OK, PerformerService.Get(id).ConvertToDto());

            return Request.CreateResponse(HttpStatusCode.NotFound);
        }

        // POST api/Performers
        public PerformerDto Post([FromBody]PerformerDto performer)
        {
            var newPerformer = performer.ConvertFromDto();
            PerformerService.Add(newPerformer);
            return newPerformer.ConvertToDto();
        }

        // POST api/Performers/Contestant/5
        [HttpPost]
        [Route("api/Performers/Contestant/{id}")]
        public PerformerDto GetShowContests(int id, [FromBody]PerformerDto performer)
        {
            var contestantId = id;
            var newPerformer = performer.ConvertFromDto();
            PerformerService.AddContestantPerformer(contestantId, newPerformer);
            return newPerformer.ConvertToDto();
        }

        // PUT api/Performers/5
        public PerformerDto Put([FromBody]PerformerDto performer)
        {
            var updatedPerformer = performer.ConvertFromDto();
            PerformerService.Update(updatedPerformer);
            return updatedPerformer.ConvertToDto();
        }

        // DELETE api/Performers/5
        public void Delete(int id)
        {
            PerformerService.Delete(id);
        }

        // DELETE api/Performers/5
        public void Delete([FromBody]PerformerDto performer)
        {
            PerformerService.Delete(performer.ConvertFromDto());
        }

        // DELETE api/Performers/
        public void Delete()
        {
            PerformerService.DeleteAll();
        }
    }
}
