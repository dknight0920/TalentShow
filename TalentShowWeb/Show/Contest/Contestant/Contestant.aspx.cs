using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShow;
using TalentShow.Services;
using TalentShowDataStorage;
using TalentShowWeb.CustomControls.Models;
using TalentShowWeb.CustomControls.Renderers;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Show.Contest.Contestant
{
    public partial class Contestant : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var contestantId = GetContestantId();
            var contestant = ServiceFactory.ContestantService.Get(contestantId);
            var performers = ServiceFactory.PerformerService.GetContestantPerformers(contestant.Id);

            labelPageTitle.Text = "Contestant: " + GetContestantHeadingText(contestant);
            labelPageDescription.Text = GetContestantDescriptionText(contestant);

            var performerItems = new List<HyperlinkListPanelItem>();

            foreach (var performer in performers)
            {
                var url = NavUtil.GetUpdatePerformerPageUrl(GetShowId(), GetContestId(), GetContestantId(), performer.Id);
                var heading = GetPerformerHeadingText(performer);
                var text = GetPerformerDescriptionText(performer);

                performerItems.Add(new HyperlinkListPanelItem(url, heading, text));
            }

            HyperlinkListPanelRenderer.Render(performersList, new HyperlinkListPanelConfig("Performers", performerItems, ButtonAddPerformerClick));
        }

        private string GetContestantHeadingText(TalentShow.Contestant contestant)
        {
            var performers = ServiceFactory.PerformerService.GetContestantPerformers(contestant.Id);

            bool isFirst = true;

            string text = "";

            foreach (var performer in performers)
            {
                text += (!isFirst ? ", " : "") + performer.Name.FirstName + " " + performer.Name.LastName;
                isFirst = false;
            }

            return text;
        }

        private string GetContestantDescriptionText(TalentShow.Contestant contestant)
        {
            return contestant.Performance.Description;
        }

        private string GetPerformerHeadingText(TalentShow.Performer performer)
        {
            return performer.Name.FirstName + " " + performer.Name.LastName;
        }

        private string GetPerformerDescriptionText(TalentShow.Performer performer)
        {
            return "Division: " + performer.Division.Name + " Affiliation: " + performer.Affiliation.Name;
        }

        protected void ButtonAddPerformerClick(object sender, EventArgs evnt)
        {
            NavUtil.GoToAddPerformerPage(Response, GetShowId(), GetContestId(), GetContestantId());
        }

        protected void btnEdit_Click(object sender, EventArgs e)
        {
            NavUtil.GoToUpdateContestantPage(Response, GetShowId(), GetContestId(), GetContestantId());
        }

        protected void btnDelete_Click(object sender, EventArgs e)
        {
            ServiceFactory.ContestantService.Delete(GetContestantId());
            NavUtil.GoToContestPage(Response, GetShowId(), GetContestId());
        }

        private int GetShowId()
        {
            return Convert.ToInt32(Request.QueryString["showId"]);
        }

        private int GetContestId()
        {
            return Convert.ToInt32(Request.QueryString["contestId"]);
        }

        private int GetContestantId()
        {
            return Convert.ToInt32(Request.QueryString["contestantId"]);
        }
    }
}