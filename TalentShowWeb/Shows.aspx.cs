using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShow.Services;
using TalentShowDataStorage;
using TalentShowWeb.CustomControls.Models;
using TalentShowWeb.CustomControls.Renderers;
using TalentShowWeb.Utils;

namespace TalentShowWeb
{
    public partial class Shows : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var items = new List<HyperlinkListPanelItem>();

            var showService = ServiceFactory.ShowService;

            foreach (var show in showService.GetAll())
                items.Add(new HyperlinkListPanelItem(URL: NavUtil.GetShowPageUrl(show.Id), Heading: show.Name, Text: show.Description));

            HyperlinkListPanelRenderer.Render(showsList, new HyperlinkListPanelConfig("Talent Shows", items, ButtonAddShowClick));
        }

        protected void ButtonAddShowClick(object sender, EventArgs evnt)
        {
            NavUtil.GoToAddShowPage(Response);
        }
    }
}