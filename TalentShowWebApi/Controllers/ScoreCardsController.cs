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
    public class ScoreCardsController : ApiController
    {
        private readonly ScoreCardService ScoreCardService;

        public ScoreCardsController()
        {
            ScoreCardService = new ScoreCardService(new ScoreCardRepo());
        }

        // GET api/ScoreCards/Contestant/5
        [HttpGet]
        [Route("api/ScoreCards/Contestant/{id}")]
        public IEnumerable<ScoreCardDto> GetContestantScoreCards(int id)
        {
            return ScoreCardService.GetContestantScoreCards(id).ConvertToDto();
        }

        // GET api/ScoreCards
        public IEnumerable<ScoreCardDto> Get()
        {
            return ScoreCardService.GetAll().ConvertToDto();
        }

        // GET api/ScoreCards/5
        public HttpResponseMessage Get(int id)
        {
            if (ScoreCardService.Exists(id))
                return Request.CreateResponse(HttpStatusCode.OK, ScoreCardService.Get(id).ConvertToDto());

            return Request.CreateResponse(HttpStatusCode.NotFound);
        }

        // POST api/ScoreCards
        public void Post([FromBody]ScoreCardDto scoreCard)
        {
            ScoreCardService.Add(scoreCard.ConvertFromDto());
        }

        // PUT api/ScoreCards/5
        public ScoreCardDto Put([FromBody]ScoreCardDto scoreCard)
        {
            var updatedScoreCard = scoreCard.ConvertFromDto();
            ScoreCardService.Update(updatedScoreCard);
            return updatedScoreCard.ConvertToDto();
        }

        // DELETE api/ScoreCards/5
        public void Delete(int id)
        {
            ScoreCardService.Delete(id);
        }

        // DELETE api/ScoreCards/5
        public void Delete([FromBody]ScoreCardDto scoreCard)
        {
            ScoreCardService.Delete(scoreCard.ConvertFromDto());
        }

        // DELETE api/ScoreCards/
        public void Delete()
        {
            ScoreCardService.DeleteAll();
        }
    }
}
