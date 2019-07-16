using System.Collections.Generic;
using System.Linq;
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

        public IEnumerable<JudgeSheetReportContestantScoreCard> GetReportContestants(TalentShow.Contest contest, int contestantId)
        {
            var reportContestants = new List<JudgeSheetReportContestantScoreCard>();

            foreach (var contestant in contest.Contestants.Where(c => c.Id == contestantId))
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

            double highestScore = 0;

            if (scoreCards != null && scoreCards.Count == 5)
            {
                var highestScoreCard = scoreCards.OrderByDescending(s => s.TotalScore).FirstOrDefault();

                if (highestScoreCard != null)
                    highestScore = highestScoreCard.TotalScore;
            }

            var penaltyPoints = ((totalScore - lowestScore) - highestScore) - finalScore;

            string organization = "";
            string parentOrganization = "";

            var performers = ServiceFactory.PerformerService.GetContestantPerformers(contestant.Id);

            if (performers != null && performers.Any())
            {
                var firstPerformer = performers.First();

                if (firstPerformer.Affiliation != null)
                {
                    organization = firstPerformer.Affiliation.Name;

                    if (firstPerformer.Affiliation.Parent != null)
                    {
                        parentOrganization = firstPerformer.Affiliation.Parent.Name;
                    }
                }
            }

            return 
                new JudgeSheetReportContestantScoreCard
                (
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
                    ScoreCards: scoreCards,
                    Organization: organization,
                    ParentOrganization: parentOrganization
                );
        }
    }
}