using System;
using System.Collections.Generic;

namespace TalentShowWeb.Models
{
    public class JudgeSheetReportContestantScoreCard : ReportContestant
    {
        public IEnumerable<TalentShow.ScoreCard> ScoreCards { get; private set; }

        public JudgeSheetReportContestantScoreCard
        (
            int ContestantId, 
            string Name, 
            string PerformanceDescription, 
            TimeSpan PerformanceDuration,
            double TotalScore, 
            double PenaltyPoints, 
            double FinalScore, 
            double LowestScore,
            double SumOfTopScores, 
            double NumberOfScoreCards, 
            double NumberOfJudges, 
            string Scores, 
            string Organization,
            string ParentOrganization,
            IEnumerable<TalentShow.ScoreCard> ScoreCards
        ): 
        base
        (
            ContestantId, 
            Name, 
            PerformanceDescription, 
            PerformanceDuration, 
            TotalScore, 
            PenaltyPoints, 
            FinalScore, 
            LowestScore, 
            SumOfTopScores, 
            NumberOfScoreCards, 
            NumberOfJudges, 
            Scores,
            Organization,
            ParentOrganization
        )
        {
            this.ScoreCards = ScoreCards;
        }
    }
}