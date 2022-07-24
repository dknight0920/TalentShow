using ExcelReportUtils;
using System.Collections.Generic;
using System.Data;
using TalentShow.Services;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Show.Utils
{
    public class ExcelSummaryReportMaker
    {
        private IEnumerable<TalentShow.Contest> contests;

        public ExcelSummaryReportMaker(IEnumerable<TalentShow.Contest> contests)
        {
            this.contests = contests;
        }

        public void Make()
        {
            DataTable table = new DataTable();
            table.Columns.Add("Rating", typeof(string));
            table.Columns.Add("Contest Name", typeof(string));
            table.Columns.Add("Contestant ID", typeof(int));
            table.Columns.Add("Name", typeof(string));
            table.Columns.Add("Performance Description", typeof(string));
            table.Columns.Add("Performance Duration", typeof(string));
            table.Columns.Add("Total Score", typeof(double));
            table.Columns.Add("Penalty Points", typeof(double));
            table.Columns.Add("Final Score", typeof(double));
            table.Columns.Add("Lowest Score", typeof(double));
            table.Columns.Add("Sum of Top Scores", typeof(double));
            table.Columns.Add("Number of Score Cards", typeof(double));
            table.Columns.Add("Number of Judges", typeof(double));
            table.Columns.Add("Scores", typeof(string));
            table.Columns.Add("Organization", typeof(string));
            table.Columns.Add("Parent Organization", typeof(string));

            var scoreRatingService = new ScoreRatingService();

            foreach (var contest in contests)
            {
                foreach (var contestant in new ReportContestantsProvider().GetReportContestants(contest))
                {
                    table.Rows.Add(
                        scoreRatingService.Rating(contestant.FinalScore),
                        contest.Name,
                        contestant.ContestantId,
                        contestant.Name,
                        contestant.PerformanceDescription,
                        contestant.PerformanceDuration.ToHHMMSS(),
                        contestant.TotalScore,
                        contestant.PenaltyPoints,
                        contestant.FinalScore,
                        contestant.LowestScore,
                        contestant.SumOfTopScores,
                        contestant.NumberOfScoreCards,
                        contestant.NumberOfJudges,
                        contestant.Scores,
                        contestant.Organization,
                        contestant.ParentOrganization);
                }
            }

            byte[] excelBytes = new ExcelDocumentMaker().MakeNewExcelPackage(table, "Summary Report");

            ExcelHttpResponseUtil.MakeResponse(excelBytes, "ShowSummaryReport");
        }
    }
}