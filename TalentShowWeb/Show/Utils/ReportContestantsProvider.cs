using System.Collections.Generic;
using System.Linq;
using TalentShow;
using TalentShowWeb.Models;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Show.Utils
{
    public class ReportContestantsProvider
    {
        public IEnumerable<ReportContestant> GetReportContestants(TalentShow.Contest contest)
        {
            var reportContestants = new List<ReportContestant>();

            foreach (var contestant in contest.Contestants)
                reportContestants.Add(GetReportContestants(contest, contestant));

            return reportContestants.OrderByDescending(c => c.FinalScore);
        }

        private ReportContestant GetReportContestants(TalentShow.Contest contest, Contestant contestant)
        {
            var scoreCards = ServiceFactory.ScoreCardService.GetContestantScoreCards(contestant.Id);
            var totalScore = scoreCards.Sum(s => s.TotalScore) + contestant.TieBreakerPoints;
            var finalScore = ServiceFactory.ScoreCardService.GetContestantTotalScore(contestant, contest.MaxDuration);
            double lowestScore = 0;

            var lowestScoreCard = scoreCards.OrderBy(s => s.TotalScore).FirstOrDefault();

            if (lowestScoreCard != null)
                lowestScore = lowestScoreCard.TotalScore;

            var penaltyPoints = (totalScore - lowestScore) - finalScore;

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
                new ReportContestant
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
                    Organization: organization,
                    ParentOrganization: parentOrganization
                );
        }
    }
}