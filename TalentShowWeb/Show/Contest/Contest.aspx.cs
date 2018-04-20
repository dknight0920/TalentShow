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
using System.Web.Script.Services;
using System.Web.Services;
using Microsoft.AspNet.Identity;
using TalentShowWeb.Models;

namespace TalentShowWeb.Show.Contest
{
    public partial class Contest : System.Web.UI.Page
    {
        private TalentShow.Contest contest;

        protected void Page_Load(object sender, EventArgs e)
        {
            RedirectUtil.RedirectUnauthenticatedUserToLoginPage();

            BreadCrumbUtil.DataBind(Page, new List<BreadCrumb>()
            {
                new BreadCrumb(NavUtil.GetHomePageUrl(), "Home"),
                new BreadCrumb(NavUtil.GetShowsPageUrl(), "Shows"),
                new BreadCrumb(NavUtil.GetShowPageUrl(GetShowId()), "Show"),
                new BreadCrumb(NavUtil.GetContestPageUrl(GetShowId(), GetContestId()), "Contest", IsActive: true),
            });

            var showId = GetShowId();
            var show = ServiceFactory.ShowService.Get(showId);

            var contestId = GetContestId();
            this.contest = ServiceFactory.ContestService.Get(contestId);

            labelPageTitle.Text = contest.Name + " (" + contest.Status + ")";
            labelPageDescription.Text = contest.Description;

            if (IsAllowedToViewContestantsList())
            {
                var contestantItems = new List<HyperlinkListPanelItem>();

                foreach (var contestant in contest.Contestants)
                {
                    var url = NavUtil.GetContestantPageUrl(showId, contestId, contestant.Id);
                    var heading = GetContestantHeadingText(contestant);
                    var text = GetContestantDescriptionText(contestant);

                    contestantItems.Add(new HyperlinkListPanelItem(url, heading, text));
                }

                HyperlinkListPanelRenderer.Render(contestantsList, new HyperlinkListPanelConfig("Contestants", contestantItems, ButtonAddContestantClick));
            }

            if (!IsUserAnAdmin()) return;

            var judgeItems = new List<HyperlinkListPanelItem>();

            foreach (var judge in contest.Judges)
            {
                var url = NavUtil.GetUpdateJudgePageUrl(showId, contestId, judge.Id);
                var heading = GetJudgeHeadingText(judge);
                var text = GetJudgeDescriptionText(judge);

                judgeItems.Add(new HyperlinkListPanelItem(url, heading, text));
            }

            HyperlinkListPanelRenderer.Render(judgesList, new HyperlinkListPanelConfig("Judges", judgeItems, ButtonAddJudgeClick));

            var scoreCriterionItems = new List<HyperlinkListPanelItem>();

            foreach (var scoreCriterion in contest.ScoreCriteria)
            {
                var url = NavUtil.GetUpdateScoreCriterionPageUrl(showId, contestId, scoreCriterion.Id);
                var heading = GetScoreCriterionHeadingText(scoreCriterion);
                var text = GetScoreCriterionDescriptionText(scoreCriterion);

                scoreCriterionItems.Add(new HyperlinkListPanelItem(url, heading, text));
            }

            HyperlinkListPanelRenderer.Render(scoreCriteriaList, new HyperlinkListPanelConfig("Score Criteria", scoreCriterionItems, ButtonAddScoreCriterionClick));
        }

        protected bool IsAllowedToViewContestantsList()
        {
            return IsUserAnAdmin() || IsUserTheTimeKeeper();
        }

        private bool IsUserTheTimeKeeper()
        {
            return contest.TimeKeeperId == Context.User.Identity.GetUserId();
        }

        protected bool IsAllowedToScoreForm()
        {
            return IsContestJudge() && IsContestInProgress();
        }

        protected bool IsContestJudge()
        {
            return contest != null && contest.Judges != null && contest.Judges.Any(j => j.UserId == Context.User.Identity.GetUserId());
        }

        protected bool IsContestInProgress()
        {
            return contest.Status == "In Progress";
        }

        protected bool IsUserAnAdmin()
        {
            return new AccountUtil(Context).IsUserAnAdmin();
        }

        protected bool IsUserASuperuser()
        {
            return new AccountUtil(Context).IsUserASuperuser();
        }

        private string GetContestantHeadingText(TalentShow.Contestant contestant)
        {       
            var performers = ServiceFactory.PerformerService.GetContestantPerformers(contestant.Id);

            string text = "";

            if (contestant.Performance.Duration.TotalMilliseconds > 0)
                text += "<span class=\"glyphicon glyphicon-time\" alt=\"Performance Duration Captured\"></span> ";

            if (!performers.Any())
                return text + "Contestant ID: " + contestant.Id;

            bool isFirst = true;

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

        private string GetJudgeHeadingText(TalentShow.Judge judge)
        {
            return new AccountUtil(Context).GetUser(judge.UserId).UserName;
        }

        private string GetJudgeDescriptionText(TalentShow.Judge judge)
        {
            return "";
        }

        private string GetScoreCriterionHeadingText(TalentShow.ScoreCriterion scoreCriterion)
        {
            return scoreCriterion.CriterionDescription;
        }

        private string GetScoreCriterionDescriptionText(TalentShow.ScoreCriterion scoreCriterion)
        {
            return "Min: " + scoreCriterion.ScoreRange.Min + " Max: " + scoreCriterion.ScoreRange.Max;
        }

        protected void ButtonAddContestantClick(object sender, EventArgs evnt)
        {
            NavUtil.GoToAddContestantPage(Response, GetShowId(), GetContestId());
        }

        protected void ButtonAddJudgeClick(object sender, EventArgs evnt)
        {
            NavUtil.GoToAddJudgePage(Response, GetShowId(), GetContestId());
        }

        protected void ButtonAddScoreCriterionClick(object sender, EventArgs evnt)
        {
            NavUtil.GoToAddScoreCriterionPage(Response, GetShowId(), GetContestId());
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

        protected void btnViewJudgeSheets_Click(object sender, EventArgs e)
        {
            NavUtil.GoToShowJudgeSheetReportPage(Response, GetShowId(), GetContestId());
        }

        private int GetShowId()
        {
            return Convert.ToInt32(Request.QueryString["showId"]);
        }

        private int GetContestId()
        {
            return Convert.ToInt32(Request.QueryString["contestId"]);
        }

        [WebMethod(EnableSession = true)]
        public static void SetScore(int contestId, int contestantId, int scoreCriterionId, double score)
        {
            var contest = ServiceFactory.ContestService.Get(contestId);
            EnsureContestIsInProgress(contest);

            var currentUserId = HttpContext.Current.User.Identity.GetUserId();
            var judge = contest.Judges.FirstOrDefault(j => j.UserId == currentUserId);

            if (judge == null) throw new ApplicationException("You are not a judge of this contest.");

            var scoreCards = ServiceFactory.ScoreCardService.GetContestantScoreCards(contestantId);

            if (scoreCards == null || !scoreCards.Any()) throw new ApplicationException("A score card doesn't exist for this contestant.");

            var scoreCard = scoreCards.FirstOrDefault(s => s.Contestant.Id == contestantId && s.Judge.Id == judge.Id);

            ServiceFactory.ScoreCardService.SetScore(scoreCard, scoreCriterionId, score, ServiceFactory.ScoreCriterionService);
        }

        [WebMethod(EnableSession = true)]
        public static void SetComment(int contestId, int contestantId, int scoreCriterionId, string comment)
        {
            var contest = ServiceFactory.ContestService.Get(contestId);
            EnsureContestIsInProgress(contest);

            var currentUserId = HttpContext.Current.User.Identity.GetUserId();
            var judge = contest.Judges.FirstOrDefault(j => j.UserId == currentUserId);

            if (judge == null) throw new ApplicationException("You are not a judge of this contest.");

            var scoreCards = ServiceFactory.ScoreCardService.GetContestantScoreCards(contestantId);

            if (scoreCards == null || !scoreCards.Any()) throw new ApplicationException("A score card doesn't exist for this contestant.");

            var scoreCard = scoreCards.FirstOrDefault(s => s.Contestant.Id == contestantId && s.Judge.Id == judge.Id);

            ServiceFactory.ScoreCardService.SetComment(scoreCard, scoreCriterionId, comment, ServiceFactory.ScoreCriterionService);
        }

        private static void EnsureContestIsInProgress(TalentShow.Contest contest)
        {
            if (contest.Status != "In Progress")
                throw new ApplicationException("The contest is not in progress. The contest must be in progress to alter a score card.");
        }
    }
}