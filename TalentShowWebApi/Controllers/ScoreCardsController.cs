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
        public ScoreCardDto Get(int id)
        {
            return ScoreCardService.Get(id).ConvertToDto();
        }

        // POST api/ScoreCards
        public void Post([FromBody]ScoreCardDto scoreCard)
        {
            ScoreCardService.Add(scoreCard.ConvertFromDto());
        }

        // PUT api/ScoreCards/5
        public void Put([FromBody]ScoreCardDto scoreCard)
        {
            ScoreCardService.Update(scoreCard.ConvertFromDto());
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
