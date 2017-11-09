using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShowWeb.CustomControls.Models;
using TalentShowWeb.CustomControls.Renderers;
using TalentShowWeb.Utils;

namespace TalentShowWeb
{
    public partial class Organizations : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var items = new List<HyperlinkListPanelItem>();

            var organizationService = ServiceFactory.OrganizationService;

            foreach (var organization in organizationService.GetAll())
                items.Add(new HyperlinkListPanelItem(URL: NavUtil.GetUpdateOrganizationPageUrl(organization.Id), Heading: organization.Name, Text: ""));

            HyperlinkListPanelRenderer.Render(organizationsList, new HyperlinkListPanelConfig("Talent Organizations", items, ButtonAddOrganizationClick));
        }

        protected void ButtonAddOrganizationClick(object sender, EventArgs evnt)
        {
            NavUtil.GoToAddOrganizationPage(Response);
        }
    }
}