using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShow;
using TalentShowWeb.Models;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Show
{
    public partial class Report : System.Web.UI.Page
    {
        public IEnumerable<TalentShow.Contest> contests; 

        protected void Page_Load(object sender, EventArgs e)
        {
            RedirectUtil.RedirectUnauthenticatedUserToLoginPage();
            RedirectUtil.RedirectNonAdminUserToHomePage();

            BreadCrumbUtil.DataBind(Page, new List<BreadCrumb>()
            {
                new BreadCrumb(NavUtil.GetHomePageUrl(), "Home"),
                new BreadCrumb(NavUtil.GetShowsPageUrl(), "Shows"),
                new BreadCrumb(NavUtil.GetShowPageUrl(GetShowId()), "Show"),
                new BreadCrumb(NavUtil.GetShowReportPageUrl(GetShowId()), "Report", IsActive: true),
            });

            if (Page.IsPostBack)
            {
                var refreshRate = (Convert.ToInt32(dropDownListRefreshRate.SelectedValue) * 60) * 1000;
                refreshTimer.Interval = refreshRate;
            }
            else
            {
                dropDownListRefreshRate.SelectedValue = "5";
                refreshTimer.Interval = 300000;
            }

            var showId = GetShowId();
            var show = ServiceFactory.ShowService.Get(showId);

            labelPageTitle.Text = show.Name;
            labelPageDescription.Text = show.Description;

            this.contests = ServiceFactory.ContestService.GetShowContests(showId);

            var status = dropDownListStatus.SelectedValue;

            if (status != "Any")
                this.contests = this.contests.Where(c => c.Status == status);
        }

        protected IEnumerable<ReportContestant> GetReportContestants(TalentShow.Contest contest)
        {
            var reportContestants = new List<ReportContestant>();

            foreach (var contestant in contest.Contestants)
                reportContestants.Add(GetReportContestants(contest, contestant));

            return reportContestants.OrderByDescending(c => c.FinalScore);
        }

        private ReportContestant GetReportContestants(TalentShow.Contest contest, Contestant contestant)
        {
            var scoreCards = ServiceFactory.ScoreCardService.GetContestantScoreCards(contestant.Id);
            var totalScore = scoreCards.Sum(s => s.TotalScore);
            var finalScore = ServiceFactory.ScoreCardService.GetContestantTotalScore(contestant, contest.MaxDuration);
            var penaltyPoints = totalScore - finalScore;
            double lowestScore = 0;

            var lowestScoreCard = scoreCards.OrderBy(s => s.TotalScore).FirstOrDefault();

            if (lowestScoreCard != null)
                lowestScore = lowestScoreCard.TotalScore;

            return new ReportContestant(
                ContestantId: contestant.Id,
                Name: GetContestantName(contestant.Id),
                PerformanceDescription: contestant.Performance.Description,
                PerformanceDuration: contestant.Performance.Duration,
                TotalScore: totalScore,
                PenaltyPoints: penaltyPoints,
                FinalScore: finalScore,
                LowestScore: lowestScore,
                SumOfTopScores: totalScore - lowestScore,
                NumberOfScoreCards: scoreCards.Count,
                NumberOfJudges: contest.Judges.Count
            );
        }

        protected string GetContestantURL(int contestantId, TalentShow.Contest contest)
        {
            return NavUtil.GetContestantPageUrl(GetShowId(), contest.Id, contestantId);
        }

        private string GetContestantName(int contestantId)
        {
            var performers = ServiceFactory.PerformerService.GetContestantPerformers(contestantId);

            bool isFirst = true;

            string text = "";

            foreach (var performer in performers)
            {
                text += (!isFirst ? ", " : "") + performer.Name.FirstName + " " + performer.Name.LastName;
                isFirst = false;
            }

            return text;
        }

        private int GetShowId()
        {
            return Convert.ToInt32(Request.QueryString["showId"]);
        }
    }
}