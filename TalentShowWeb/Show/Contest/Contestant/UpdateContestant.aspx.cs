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
    public partial class UpdateContestant : System.Web.UI.Page
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
                new BreadCrumb(NavUtil.GetContestantPageUrl(GetShowId(), GetContestId(), GetContestantId()), "Contestant"),
                new BreadCrumb(NavUtil.GetUpdateContestantPageUrl(GetShowId(), GetContestId(), GetContestantId()), "Update Contestant", IsActive: true),
            });

            labelPageTitle.Text = "Update the Contestant";
            labelPageDescription.Text = "Use the form below to update the contestant.";

            contestantForm.GetSubmitButton().Click += new EventHandler(btnUpdateContestant_Click);
            contestantForm.GetCancelButton().Click += new EventHandler(btnCancel_Click);
        }

        protected void Page_PreRender(object sender, EventArgs e)
        {
            var contestantService = ServiceFactory.ContestantService;
            var contestant = contestantService.Get(GetContestantId());
            contestantForm.GetPerformanceDescriptionTextBox().Text = contestant.Performance.Description;
            contestantForm.GetRuleViolationPenaltyPointsTextBox().Text = Convert.ToString(contestant.RuleViolationPenalty);
        }

        protected void btnUpdateContestant_Click(object sender, EventArgs e)
        {
            if (!Page.IsValid)
            {
                //TODO
                return;
            }

            var contestantService = ServiceFactory.ContestantService;
            var contestant = contestantService.Get(GetContestantId());
            var performanceDescription = contestantForm.GetPerformanceDescriptionTextBox().Text.Trim();
            var ruleViolationPenaltyPoints = Convert.ToDouble(contestantForm.GetRuleViolationPenaltyPointsTextBox().Text.Trim());
            var updatedContestant = new TalentShow.Contestant(
                GetContestantId(), 
                new TalentShow.Performance(
                    contestant.Performance.Id, performanceDescription, contestant.Performance.Duration), ruleViolationPenaltyPoints);

            contestantService.Update(updatedContestant);
            GoToContestantPage();
        }

        protected void btnCancel_Click(object sender, EventArgs e)
        {
            GoToContestantPage();
        }

        private void GoToContestantPage()
        {
            NavUtil.GoToContestantPage(Response, GetShowId(), GetContestId(), GetContestantId());
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