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
    public partial class Divisions : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            RedirectUtil.RedirectUnauthenticatedUserToLoginPage();
            RedirectUtil.RedirectNonAdminUserToHomePage();

            var items = new List<HyperlinkListPanelItem>();

            var divisionService = ServiceFactory.DivisionService;

            foreach (var division in divisionService.GetAll())
                items.Add(new HyperlinkListPanelItem(URL: NavUtil.GetUpdateDivisionPageUrl(division.Id), Heading: division.Name, Text: ""));

            HyperlinkListPanelRenderer.Render(divisionsList, new HyperlinkListPanelConfig("Talent Divisions", items, ButtonAddDivisionClick));
        }

        protected void ButtonAddDivisionClick(object sender, EventArgs evnt)
        {
            NavUtil.GoToAddDivisionPage(Response);
        }
    }
}