using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShowWeb.Models;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Show.Contest.ScoreCriterion
{
    public partial class AddScoreCriterion : System.Web.UI.Page
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
                new BreadCrumb(NavUtil.GetAddScoreCriterionPageUrl(GetShowId(), GetContestId()), "Add Score Criterion", IsActive: true),
            });

            labelPageTitle.Text = "Add a Score Criterion";
            labelPageDescription.Text = "Use the form below to create a new score criterion.";

            scoreCriterionForm.GetSubmitButton().Click += new EventHandler(btnAddScoreCriterion_Click);
            scoreCriterionForm.GetCancelButton().Click += new EventHandler(btnCancel_Click);
        }

        protected void btnAddScoreCriterion_Click(object sender, EventArgs e)
        {
            if (!Page.IsValid)
            {
                //TODO
                return;
            }

            var description = scoreCriterionForm.GetDescriptionTextBox().Text.Trim();
            var minScore = Convert.ToDouble(scoreCriterionForm.GetMinScoreTextBox().Text.Trim());
            var maxScore = Convert.ToDouble(scoreCriterionForm.GetMaxScoreTextBox().Text.Trim());
            var scoreCriterion = new TalentShow.ScoreCriterion(0, description, new TalentShow.ScoreRange(minScore, maxScore));
            ServiceFactory.ScoreCriterionService.AddContestScoreCriterion(GetContestId(), scoreCriterion);
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