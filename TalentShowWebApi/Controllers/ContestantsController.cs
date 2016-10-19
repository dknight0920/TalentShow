using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TalentShowDataStorage;
using TalentShowWebApi.DataTransferObjects;
using TalentShowWebApi.DataTransferObjects.Helpers;

namespace TalentShowWebApi.Controllers
{
    [Authorize]
    public class ContestantsController : ApiController
    {
        // GET api/Contestant
        public IEnumerable<ContestantDto> Get()
        {
            return new ContestantRepo().GetAll().ConvertToDto();
        }

        // GET api/Contestant/5
        public ContestantDto Get(int id)
        {
            return new ContestantRepo().Get(id).ConvertToDto();
        }

        // POST api/Contestant
        public void Post([FromBody]ContestantDto contestant)
        {
            new ContestantRepo().Add(contestant.ConvertFromDto());
        }

        // PUT api/Contestant/5
        public void Put([FromBody]ContestantDto contestant)
        {
            new ContestantRepo().Update(contestant.ConvertFromDto());
        }

        // DELETE api/Contestant/5
        public void Delete(int id)
        {
            new ContestantRepo().Delete(id);
        }

        // DELETE api/Contestant/5
        public void Delete([FromBody]ContestantDto contestant)
        {
            new ContestantRepo().Delete(contestant.ConvertFromDto());
        }

        // DELETE api/Contestant/
        public void Delete()
        {
            new ContestantRepo().DeleteAll();
        }
    }
}
