using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Show.Contest.ScoreCriterion
{
    public partial class UpdateScoreCriterion : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            labelPageTitle.Text = "Update the Score Criterion";
            labelPageDescription.Text = "Use the form below to update the score criterion.";

            scoreCriterionForm.GetSubmitButton().Click += new EventHandler(btnUpdateScoreCriterion_Click);
            scoreCriterionForm.GetCancelButton().Click += new EventHandler(btnCancel_Click);
        }

        protected void Page_PreRender(object sender, EventArgs e)
        {
            var scoreCriterionService = ServiceFactory.ScoreCriterionService;
            var scoreCriterion = scoreCriterionService.Get(GetScoreCriterionId());
            scoreCriterionForm.GetDescriptionTextBox().Text = scoreCriterion.CriterionDescription;
            scoreCriterionForm.GetMinScoreTextBox().Text = Convert.ToString(scoreCriterion.ScoreRange.Min);
            scoreCriterionForm.GetMaxScoreTextBox().Text = Convert.ToString(scoreCriterion.ScoreRange.Max);
        }

        protected void btnUpdateScoreCriterion_Click(object sender, EventArgs e)
        {
            if (!Page.IsValid)
            {
                //TODO
                return;
            }

            var description = scoreCriterionForm.GetDescriptionTextBox().Text.Trim();
            var minScore = Convert.ToDouble(scoreCriterionForm.GetMinScoreTextBox().Text.Trim());
            var maxScore = Convert.ToDouble(scoreCriterionForm.GetMaxScoreTextBox().Text.Trim());
            var scoreCriterion = new TalentShow.ScoreCriterion(GetScoreCriterionId(), description, new TalentShow.ScoreRange(minScore, maxScore));
            ServiceFactory.ScoreCriterionService.Update(scoreCriterion);
            GoToContestPage();
        }

        protected void btnCancel_Click(object sender, EventArgs e)
        {
            GoToContestPage();
        }

        protected void btnDelete_Click(object sender, EventArgs e)
        {
            ServiceFactory.ScoreCriterionService.Delete(GetScoreCriterionId());
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

        private int GetScoreCriterionId()
        {
            return Convert.ToInt32(Request.QueryString["scoreCriterionId"]);
        }
    }
}