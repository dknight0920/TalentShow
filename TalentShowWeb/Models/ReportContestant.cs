using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TalentShowWeb.Models
{
    public class ReportContestant
    {
        public int ContestantId { get; private set; }
        public string Name { get; private set; }
        public string PerformanceDescription { get; private set; }
        public TimeSpan PerformanceDuration { get; private set; }
        public double TotalScore { get; private set; }
        public double PenaltyPoints { get; private set; }
        public double FinalScore { get; private set; }
        public double LowestScore { get; private set; }
        public double SumOfTopScores { get; private set; }
        public double NumberOfScoreCards { get; private set; }
        public double NumberOfJudges { get; private set; }
        public string Scores { get; private set; }

        public ReportContestant(int ContestantId, string Name, string PerformanceDescription, TimeSpan PerformanceDuration, 
            double TotalScore, double PenaltyPoints, double FinalScore, double LowestScore, double SumOfTopScores, double NumberOfScoreCards, double NumberOfJudges, string Scores)
        {
            this.ContestantId = ContestantId;
            this.Name = Name;
            this.PerformanceDescription = PerformanceDescription;
            this.PerformanceDuration = PerformanceDuration;
            this.TotalScore = TotalScore;
            this.PenaltyPoints = PenaltyPoints;
            this.FinalScore = FinalScore;
            this.LowestScore = LowestScore;
            this.SumOfTopScores = SumOfTopScores;
            this.NumberOfScoreCards = NumberOfScoreCards;
            this.NumberOfJudges = NumberOfJudges;
            this.Scores = Scores;

        }
    }
}