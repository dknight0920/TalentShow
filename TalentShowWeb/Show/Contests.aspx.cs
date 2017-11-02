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

namespace TalentShowWeb.Show
{
    public partial class Contests : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var items = new List<HyperlinkListPanelItem>();

            foreach (var contest in new ContestService(new ContestRepo(), new ShowContestRepo()).GetShowContests(Convert.ToInt32(Request.QueryString["showId"])))
                items.Add(new HyperlinkListPanelItem(URL: "#", Heading: contest.Name, Text: contest.Description));

            HyperlinkListPanelRenderer.Render(contestsList, new HyperlinkListPanelConfig("Contests", items, ButtonAddShowClick));
        }

        protected void ButtonAddShowClick(object sender, EventArgs evnt)
        {
            Response.Redirect("~/About.aspx");
        }
    }
}