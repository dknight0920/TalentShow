using ExcelReportUtils;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using TalentShow;
using TalentShowWeb.Account.Util;

namespace TalentShowWeb.Show.Utils
{
    public class ExcelJudgeSheetReportMaker
    {
        private IEnumerable<TalentShow.Contest> contests;

        public ExcelJudgeSheetReportMaker(IEnumerable<TalentShow.Contest> contests)
        {
            this.contests = contests;
        }

        public void Make()
        {
            DataTable table = new DataTable();
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
            table.Columns.Add("Score Cards", typeof(string));

            foreach (var contest in contests)
            {
                foreach (var contestant in new JudgeSheetReportContestantScoreCardProvider().GetReportContestants(contest))
                {
                    table.Rows.Add(
                        contest.Name,
                        contestant.ContestantId,
                        contestant.Name,
                        contestant.PerformanceDescription,
                        contestant.PerformanceDuration.Hours.ToString("00") + ":" + contestant.PerformanceDuration.Minutes.ToString("00") + ":" + contestant.PerformanceDuration.Seconds.ToString("00"),
                        contestant.TotalScore,
                        contestant.PenaltyPoints,
                        contestant.FinalScore,
                        contestant.LowestScore,
                        contestant.SumOfTopScores,
                        contestant.NumberOfScoreCards,
                        contestant.NumberOfJudges,
                        contestant.Scores,
                        GetScoreCardsText(contestant.ScoreCards));
                }
            }

            byte[] excelBytes = new ExcelDocumentMaker().MakeNewExcelPackage(table, "Judge Sheet Report");

            ExcelHttpResponseUtil.MakeResponse(excelBytes);
        }

        private string GetScoreCardsText(IEnumerable<ScoreCard> scoreCards)
        {
            string value = "";

            foreach (var card in scoreCards)
            {
                if (!String.IsNullOrWhiteSpace(value))
                {
                    value += Environment.NewLine + Environment.NewLine;
                }

                value += "Score Card by " + GetJudgeUserName(card.Judge.UserId) + ":" + Environment.NewLine;

                bool isFirst = true;

                foreach (var c in card.ScorableCriteria)
                {
                    if (!isFirst)
                    {
                        value += Environment.NewLine;
                    }

                    value += "  " + c.ScoreCriterion.CriterionDescription + ":" + Environment.NewLine + "    Score: " + c.Score  + Environment.NewLine +  "    Comment: " + c.Comment;

                    isFirst = false;
                }
            }

            return value;
        }

        private string GetJudgeUserName(string userId)
        {
            return new AccountUtil(HttpContext.Current).GetUser(userId).UserName;
        }
    }
}