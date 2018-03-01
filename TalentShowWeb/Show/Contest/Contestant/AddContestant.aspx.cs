using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShowWeb.Models;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Show.Contest.Contestant
{
    public partial class AddContestant : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            RedirectUtil.RedirectUnauthenticatedUserToLoginPage();
            RedirectUtil.RedirectNonAdminUserToHomePage();

            BreadCrumbUtil.DataBind(Page, new List<BreadCrumb>()
            {
                new BreadCrumb(NavUtil.GetHomePageUrl(), "Home"),
                new BreadCrumb(NavUtil.GetShowsPageUrl(), "Shows"),
                new BreadCrumb(NavUtil.GetShowPageUrl(GetShowId()), "Show"),
                new BreadCrumb(NavUtil.GetContestPageUrl(GetShowId(), GetContestId()), "Contest"),
                new BreadCrumb(NavUtil.GetAddContestantPageUrl(GetShowId(), GetContestId()), "Add Contestant", IsActive: true),
            });

            labelPageTitle.Text = "Add a Contestant";
            labelPageDescription.Text = "Use the form below to create a new contestant.";

            contestantForm.GetSubmitButton().Click += new EventHandler(btnAddContestant_Click);
            contestantForm.GetCancelButton().Click += new EventHandler(btnCancel_Click);
        }

        protected void Page_PreRender(object sender, EventArgs e)
        {
            contestantForm.GetPerformanceDurationTextBox().Text = new TimeSpan(0).ToHHMMSS();
            contestantForm.GetRuleViolationPenaltyPointsTextBox().Text = Convert.ToString(0);
            contestantForm.GetTieBreakerPointsTextBox().Text = Convert.ToString(0);
        }

        protected void btnAddContestant_Click(object sender, EventArgs e)
        {
            if (!Page.IsValid)
            {
                //TODO
                return;
            }

            var performanceDescription = contestantForm.GetPerformanceDescriptionTextBox().Text.Trim();

            var performanceDuration = new TimeSpan(0);

            try
            {
                var performanceDurationParts = contestantForm.GetPerformanceDurationTextBox().Text.Trim().Split(':');
                performanceDuration = new TimeSpan(Convert.ToInt32(performanceDurationParts[0]), Convert.ToInt32(performanceDurationParts[1]), Convert.ToInt32(performanceDurationParts[2]));
            }
            catch { }

            var ruleViolationPenaltyPoints = Convert.ToDouble(contestantForm.GetRuleViolationPenaltyPointsTextBox().Text.Trim());
            var tieBreakerPoints = Convert.ToDouble(contestantForm.GetTieBreakerPointsTextBox().Text.Trim());
            var contestant = new TalentShow.Contestant(0, new TalentShow.Performance(0, performanceDescription, performanceDuration), ruleViolationPenaltyPoints, tieBreakerPoints);
            ServiceFactory.ContestantService.AddContestContestant(GetContestId(), contestant);
            GoToContestPage();
        }

        protected void btnCancel_Click(object sender, EventArgs e)
        {
            GoToContestPage();
        }

        private void GoToContestPage()
        {
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
    }
}