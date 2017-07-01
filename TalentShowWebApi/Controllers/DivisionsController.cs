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
    public class DivisionsController : ApiController
    {
        private readonly DivisionService DivisionService;

        public DivisionsController()
        {
            DivisionService = new DivisionService(new DivisionRepo());
        }

        // GET api/Divisions
        public IEnumerable<DivisionDto> Get()
        {
            return DivisionService.GetAll().ConvertToDto();
        }

        // GET api/Divisions/5
        public HttpResponseMessage Get(int id)
        {
            if (DivisionService.Exists(id))
                return Request.CreateResponse(HttpStatusCode.OK, DivisionService.Get(id).ConvertToDto());

            return Request.CreateResponse(HttpStatusCode.NotFound);
        }

        // POST api/Divisions
        public DivisionDto Post([FromBody]DivisionDto division)
        {
            var newDivision = division.ConvertFromDto();
            DivisionService.Add(newDivision);
            return newDivision.ConvertToDto();
        }

        // PUT api/Divisions/5
        public DivisionDto Put([FromBody]DivisionDto division)
        {
            var updatedDivision = division.ConvertFromDto();
            DivisionService.Update(updatedDivision);
            return updatedDivision.ConvertToDto();
        }

        // DELETE api/Divisions/5
        public void Delete(int id)
        {
            DivisionService.Delete(id);
        }

        // DELETE api/Divisions/5
        public void Delete([FromBody]DivisionDto division)
        {
            DivisionService.Delete(division.ConvertFromDto());
        }

        // DELETE api/Divisions/
        public void Delete()
        {
            DivisionService.DeleteAll();
        }
    }
}