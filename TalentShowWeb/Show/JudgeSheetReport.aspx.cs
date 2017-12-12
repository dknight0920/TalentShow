using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShowWeb.Account.Util;
using TalentShowWeb.Models;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Show
{
    public partial class JudgeSheetReport : System.Web.UI.Page
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
                new BreadCrumb(NavUtil.GetShowReportPageUrl(GetShowId()), "Judge Sheet Report", IsActive: true),
            });

            var showId = GetShowId();
            var show = ServiceFactory.ShowService.Get(showId);

            labelPageTitle.Text = show.Name;
            labelPageDescription.Text = show.Description;

            this.contests = ServiceFactory.ContestService.GetShowContests(showId);
        }

        protected IEnumerable<JudgeSheetReportContestantScoreCard> GetReportContestants(TalentShow.Contest contest)
        {
            var reportContestants = new List<JudgeSheetReportContestantScoreCard>();

            foreach (var contestant in contest.Contestants)
                reportContestants.Add(GetReportContestant(contest, contestant));

            return reportContestants.OrderByDescending(c => c.FinalScore);
        }

        private JudgeSheetReportContestantScoreCard GetReportContestant(TalentShow.Contest contest, TalentShow.Contestant contestant)
        {
            var scoreCards = ServiceFactory.ScoreCardService.GetContestantScoreCards(contestant.Id);
            var totalScore = scoreCards.Sum(s => s.TotalScore);
            var finalScore = ServiceFactory.ScoreCardService.GetContestantTotalScore(contestant, contest.MaxDuration);
            double lowestScore = 0;

            var lowestScoreCard = scoreCards.OrderBy(s => s.TotalScore).FirstOrDefault();

            if (lowestScoreCard != null)
                lowestScore = lowestScoreCard.TotalScore;

            var penaltyPoints = (totalScore - lowestScore) - finalScore;

            return new JudgeSheetReportContestantScoreCard(
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
                NumberOfJudges: contest.Judges.Count,
                Scores: GetScores(scoreCards),
                ScoreCards: scoreCards
            );
        }

        protected string GetContestantURL(int contestantId, TalentShow.Contest contest)
        {
            return NavUtil.GetContestantPageUrl(GetShowId(), contest.Id, contestantId);
        }

        protected string GetJudgeUserName(string userId)
        {
            return new AccountUtil(Context).GetUser(userId).UserName;
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

        private string GetScores(ICollection<TalentShow.ScoreCard> scoreCards)
        {
            bool isFirst = true;

            string text = "";

            foreach (var scoreCard in scoreCards)
            {
                text += (!isFirst ? ", " : "") + scoreCard.TotalScore;
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