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
    public class ScoreCriteriaController : ApiController
    {
        private readonly ScoreCriterionService ScoreCriterionService;

        public ScoreCriteriaController()
        {
            ScoreCriterionService = new ScoreCriterionService(new ScoreCriterionRepo(), new ContestScoreCriterionRepo());
        }

        // GET api/ScoreCriteria/Contest/5
        [HttpGet]
        [Route("api/ScoreCriteria/Contest/{id}")]
        public IEnumerable<ScoreCriterionDto> GetContestScoreCriteria(int id)
        {
            return ScoreCriterionService.GetContestScoreCriteria(id).ConvertToDto();
        }

        // GET api/ScoreCriteria
        public IEnumerable<ScoreCriterionDto> Get()
        {
            return ScoreCriterionService.GetAll().ConvertToDto();
        }

        // GET api/ScoreCriteria/5
        public HttpResponseMessage Get(int id)
        {
            if (ScoreCriterionService.Exists(id))
                return Request.CreateResponse(HttpStatusCode.OK, ScoreCriterionService.Get(id).ConvertToDto());

            return Request.CreateResponse(HttpStatusCode.NotFound);
        }

        // POST api/ScoreCriteria
        public void Post([FromBody]ScoreCriterionDto scoreCriterion)
        {
            ScoreCriterionService.Add(scoreCriterion.ConvertFromDto());
        }

        // POST api/ScoreCriteria/Contest/5
        [HttpPost]
        [Route("api/ScoreCriteria/Contest/{id}")]
        public ScoreCriterionDto GetShowContests(int id, [FromBody]ScoreCriterionDto scoreCriterion)
        {
            var contestId = id;
            var newScoreCriterion = scoreCriterion.ConvertFromDto();
            ScoreCriterionService.AddContestScoreCriterion(contestId, newScoreCriterion);
            return newScoreCriterion.ConvertToDto();
        }

        // PUT api/ScoreCriteria/5
        public ScoreCriterionDto Put([FromBody]ScoreCriterionDto scoreCriterion)
        {
            var updatedScoreCriterion = scoreCriterion.ConvertFromDto();
            ScoreCriterionService.Update(updatedScoreCriterion);
            return updatedScoreCriterion.ConvertToDto();
        }

        // DELETE api/ScoreCriteria/5
        public void Delete(int id)
        {
            ScoreCriterionService.Delete(id);
        }

        // DELETE api/ScoreCriteria/5
        public void Delete([FromBody]ScoreCriterionDto scoreCriterion)
        {
            ScoreCriterionService.Delete(scoreCriterion.ConvertFromDto());
        }

        // DELETE api/ScoreCriteria/
        public void Delete()
        {
            ScoreCriterionService.DeleteAll();
        }
    }
}
