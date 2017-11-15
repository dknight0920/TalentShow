using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShow;
using TalentShowWeb.Account.Util;
using TalentShowWeb.Utils;
using Microsoft.AspNet.Identity;

namespace TalentShowWeb.Show.Contest
{
    public partial class ScoreForm : System.Web.UI.UserControl
    {
        private TalentShow.Contest contest;
        private TalentShow.Judge judge;

        protected void Page_Load(object sender, EventArgs e)
        {
            contest = ServiceFactory.ContestService.Get(GetContestId());
            var currentUserId = HttpContext.Current.User.Identity.GetUserId();
            judge = contest.Judges.FirstOrDefault(j => j.UserId == currentUserId);
        }

        protected TalentShow.Contest GetContest()
        {
            return contest;
        }

        private int GetContestId()
        {
            return Convert.ToInt32(Request.QueryString["contestId"]);
        }

        protected TalentShow.ScoreCard GetScoreCard(TalentShow.Contestant contestant)
        {
            if (judge == null) return null;

            var scoreCardService = ServiceFactory.ScoreCardService;
            var scoreCards = scoreCardService.GetContestantScoreCards(contestant.Id);
            var judgeScoreCard = scoreCards.FirstOrDefault(s => s.Judge.Id == judge.Id);

            if (judgeScoreCard == null)
            {
                judgeScoreCard = contest.GetBlankScoreCard(contestant, judge);
                scoreCardService.Add(judgeScoreCard);
            }

            return judgeScoreCard;
        }

        protected double GetScore(TalentShow.ScoreCard scoreCard, TalentShow.ScoreCriterion scoreCriterion)
        {
            double score = 0;

            if (scoreCard != null)
            {
                var scorableCriterion = scoreCard.ScorableCriteria.FirstOrDefault(s => s.ScoreCriterion.Id == scoreCriterion.Id);

                if (scorableCriterion != null)
                    score = scorableCriterion.Score;
            }

            return score;
        }

        protected string GetComment(TalentShow.ScoreCard scoreCard, TalentShow.ScoreCriterion scoreCriterion)
        {
            string comment = "";

            if (scoreCard != null)
            {
                var scorableCriterion = scoreCard.ScorableCriteria.FirstOrDefault(s => s.ScoreCriterion.Id == scoreCriterion.Id);

                if (scorableCriterion != null)
                    comment = scorableCriterion.Comment;
            }

            return comment;
        }

        protected string GetContestantHeadingText(TalentShow.Contestant contestant)
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
    }
}