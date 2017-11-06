using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShow;
using TalentShow.Services;
using TalentShowDataStorage;
using TalentShowWeb.Account.Util;
using TalentShowWeb.CustomControls.Models;
using TalentShowWeb.CustomControls.Renderers;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Show.Contest
{
    public partial class Contest : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var showId = GetShowId();
            var show = ServiceFactory.ShowService.Get(showId);

            var contestId = GetContestId();
            var contest = ServiceFactory.ContestService.Get(contestId);

            labelPageTitle.Text = "Contest: " + contest.Name;
            labelPageDescription.Text = contest.Description;

            var contestantItems = new List<HyperlinkListPanelItem>();

            foreach (var contestant in contest.Contestants)
            {
                var url = NavUtil.GetContestantPageUrl(showId, contestId, contestant.Id);
                var heading = GetContestantHeadingText(contestant);
                var text = GetContestantDescriptionText(contestant);

                contestantItems.Add(new HyperlinkListPanelItem(url, heading, text));
            }

            HyperlinkListPanelRenderer.Render(contestantsList, new HyperlinkListPanelConfig("Contestants", contestantItems, ButtonAddContestantClick));

            var judgeItems = new List<HyperlinkListPanelItem>();

            foreach (var judge in contest.Judges)
            {
                var url = "~";
                var heading = GetJudgeHeadingText(judge);
                var text = GetJudgeDescriptionText(judge);

                judgeItems.Add(new HyperlinkListPanelItem(url, heading, text));
            }

            HyperlinkListPanelRenderer.Render(judgesList, new HyperlinkListPanelConfig("Judges", judgeItems, ButtonAddJudgeClick));

            var scoreCriterionItems = new List<HyperlinkListPanelItem>();

            foreach (var scoreCriterion in contest.ScoreCriteria)
            {
                var url = "~";
                var heading = GetScoreCriterionHeadingText(scoreCriterion);
                var text = GetScoreCriterionDescriptionText(scoreCriterion);

                scoreCriterionItems.Add(new HyperlinkListPanelItem(url, heading, text));
            }

            HyperlinkListPanelRenderer.Render(scoreCriteriaList, new HyperlinkListPanelConfig("Score Criteria", scoreCriterionItems, ButtonAddScoreCriterionClick));
        }

        private string GetContestantHeadingText(TalentShow.Contestant contestant)
        {       
            var performers = ServiceFactory.PerformerService.GetContestantPerformers(contestant.Id);

            if (!performers.Any())
                return "Contestant ID: " + contestant.Id;

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

        private string GetJudgeHeadingText(Judge judge)
        {
            return new AccountUtil(Context).GetUserEmail(judge.UserId);
        }

        private string GetJudgeDescriptionText(Judge judge)
        {
            return "";
        }

        private string GetScoreCriterionHeadingText(ScoreCriterion scoreCriterion)
        {
            return scoreCriterion.CriterionDescription;
        }

        private string GetScoreCriterionDescriptionText(ScoreCriterion scoreCriterion)
        {
            return "Min: " + scoreCriterion.ScoreRange.Min + " Max: " + scoreCriterion.ScoreRange.Max;
        }

        protected void ButtonAddContestantClick(object sender, EventArgs evnt)
        {
            NavUtil.GoToAddContestantPage(Response, GetShowId(), GetContestId());
        }

        protected void ButtonAddJudgeClick(object sender, EventArgs evnt)
        {
            Response.Redirect("~/About.aspx");
        }

        protected void ButtonAddScoreCriterionClick(object sender, EventArgs evnt)
        {
            Response.Redirect("~/About.aspx");
        }

        protected void btnEdit_Click(object sender, EventArgs e)
        {
            NavUtil.GoToUpdateContestPage(Response, GetShowId(), GetContestId());
        }

        protected void btnDelete_Click(object sender, EventArgs e)
        {
            ServiceFactory.ContestService.Delete(GetContestId());
            NavUtil.GoToShowPage(Response, GetShowId());
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