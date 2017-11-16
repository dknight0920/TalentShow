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

namespace TalentShowWeb.Show.Contest.Contestant
{
    public partial class Contestant : System.Web.UI.Page
    {
        private ICollection<TalentShow.ScoreCard> scoreCards;
        protected TalentShow.Contestant contestant;
        private TalentShow.Contest contest;

        protected void Page_Load(object sender, EventArgs e)
        {
            var contestantId = GetContestantId();
            this.contestant = ServiceFactory.ContestantService.Get(contestantId);
            this.contest = ServiceFactory.ContestService.Get(GetContestId());
            this.scoreCards = ServiceFactory.ScoreCardService.GetContestantScoreCards(contestantId);
            var performers = ServiceFactory.PerformerService.GetContestantPerformers(contestantId);

            labelPageTitle.Text = "Contestant: " + GetContestantHeadingText(performers);
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

        protected ICollection<TalentShow.ScoreCard> GetScoreCards()
        {
            return ServiceFactory.ScoreCardService.GetContestantScoreCards(GetContestantId());
        }

        protected string GetJudgeEmailAddress(string userId)
        {
            return new AccountUtil(Context).GetUserEmail(userId);
        }

        protected double GetTotalScore()
        {
            if (scoreCards == null || !scoreCards.Any())
                return 0;

            return scoreCards.Sum(s => s.TotalScore);
        }

        protected double GetPenaltyPoints()
        {
            return GetTotalScore() - GetFinalScore();
        }

        protected double GetFinalScore()
        {
            if (scoreCards == null || !scoreCards.Any())
                return 0;

            return ServiceFactory.ScoreCardService.GetContestantTotalScore(contestant, contest.MaxDuration);
        }

        private string GetContestantHeadingText(ICollection<TalentShow.Performer> performers)
        {
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

        [WebMethod(EnableSession = true)]
        public static void SetDuration(int contestantId, int duration)
        {
            var contestant = ServiceFactory.ContestantService.Get(contestantId);

            if (contestant == null || contestant.Id != contestantId) return;

            var performance = new TalentShow.Performance(contestant.Performance.Id, contestant.Performance.Description, new TimeSpan(0,0,0,0, duration));

            ServiceFactory.ContestantService.UpdatePerformance(performance);
        }
    }
}