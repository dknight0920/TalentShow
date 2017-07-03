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
    public class OrganizationsController : ApiController
    {
        private readonly OrganizationService OrganizationService;

        public OrganizationsController()
        {
            OrganizationService = new OrganizationService(new OrganizationRepo());
        }

        // GET api/Organizations
        public IEnumerable<OrganizationDto> Get()
        {
            return OrganizationService.GetAll().ConvertToDto();
        }

        // GET api/Organizations/5
        public HttpResponseMessage Get(int id)
        {
            if (OrganizationService.Exists(id))
                return Request.CreateResponse(HttpStatusCode.OK, OrganizationService.Get(id).ConvertToDto());

            return Request.CreateResponse(HttpStatusCode.NotFound);
        }

        // POST api/Organizations
        public OrganizationDto Post([FromBody]OrganizationDto organization)
        {
            var newOrganization = organization.ConvertFromDto();
            OrganizationService.Add(newOrganization);
            return newOrganization.ConvertToDto();
        }

        // PUT api/Organizations/5
        public OrganizationDto Put([FromBody]OrganizationDto organization)
        {
            var updatedOrganization = organization.ConvertFromDto();
            OrganizationService.Update(updatedOrganization);
            return updatedOrganization.ConvertToDto();
        }

        // DELETE api/Organizations/5
        public void Delete(int id)
        {
            OrganizationService.Delete(id);
        }

        // DELETE api/Organizations/5
        public void Delete([FromBody]OrganizationDto organization)
        {
            OrganizationService.Delete(organization.ConvertFromDto());
        }

        // DELETE api/Organizations/
        public void Delete()
        {
            OrganizationService.DeleteAll();
        }
    }
}
