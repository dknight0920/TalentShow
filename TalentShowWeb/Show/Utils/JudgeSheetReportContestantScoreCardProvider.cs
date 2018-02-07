using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShowWeb.Account.Util;
using TalentShowWeb.Models;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Show.Utils
{
    public class JudgeSheetReportContestantScoreCardProvider
    {
        public IEnumerable<JudgeSheetReportContestantScoreCard> GetReportContestants(TalentShow.Contest contest)
        {
            var reportContestants = new List<JudgeSheetReportContestantScoreCard>();

            foreach (var contestant in contest.Contestants)
                reportContestants.Add(GetReportContestant(contest, contestant));

            return reportContestants.OrderByDescending(c => c.FinalScore);
        }

        private JudgeSheetReportContestantScoreCard GetReportContestant(TalentShow.Contest contest, TalentShow.Contestant contestant)
        {
            var scoreCards = ServiceFactory.ScoreCardService.GetContestantScoreCards(contestant.Id);
            var totalScore = scoreCards.Sum(s => s.TotalScore) + contestant.TieBreakerPoints;
            var finalScore = ServiceFactory.ScoreCardService.GetContestantTotalScore(contestant, contest.MaxDuration);
            double lowestScore = 0;

            var lowestScoreCard = scoreCards.OrderBy(s => s.TotalScore).FirstOrDefault();

            if (lowestScoreCard != null)
                lowestScore = lowestScoreCard.TotalScore;

            var penaltyPoints = (totalScore - lowestScore) - finalScore;

            return new JudgeSheetReportContestantScoreCard(
                ContestantId: contestant.Id,
                Name: ContestantNameUtil.GetContestantName(contestant.Id),
                PerformanceDescription: contestant.Performance.Description,
                PerformanceDuration: contestant.Performance.Duration,
                TotalScore: totalScore,
                PenaltyPoints: penaltyPoints,
                FinalScore: finalScore,
                LowestScore: lowestScore,
                SumOfTopScores: totalScore - lowestScore,
                NumberOfScoreCards: scoreCards.Count,
                NumberOfJudges: contest.Judges.Count,
                Scores: ScoresUtil.GetScores(scoreCards),
                ScoreCards: scoreCards
            );
        }
    }
}