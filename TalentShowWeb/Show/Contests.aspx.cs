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
            var showId = Convert.ToInt32(Request.QueryString["showId"]);
            var show = new ShowService(new ShowRepo()).Get(showId);

            labelPageTitle.Text = "Show: " + show.Name;
            labelPageDescription.Text = show.Description;

            var contests = new ContestService(new ContestRepo(), new ShowContestRepo()).GetShowContests(showId);

            foreach (var contest in contests)
                items.Add(new HyperlinkListPanelItem(URL: "~/Show/Contest/Contest.aspx?showId=" + showId + "&contestId=" + contest.Id, Heading: contest.Name, Text: contest.Description));

            HyperlinkListPanelRenderer.Render(contestsList, new HyperlinkListPanelConfig("Contests", items, ButtonAddShowClick));
        }

        protected void ButtonAddShowClick(object sender, EventArgs evnt)
        {
            Response.Redirect("~/About.aspx");
        }
    }
}