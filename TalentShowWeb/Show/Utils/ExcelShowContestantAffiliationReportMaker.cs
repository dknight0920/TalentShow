using ExcelReportUtils;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Show.Utils
{
    public class ExcelShowContestantAffiliationReportMaker
    {
        private IEnumerable<TalentShow.Contest> contests;

        public ExcelShowContestantAffiliationReportMaker(IEnumerable<TalentShow.Contest> contests)
        {
            this.contests = contests;
        }

        public void Make()
        {
            var sheetDictionary = new Dictionary<string, DataTable>();

            foreach (var contest in contests)
            {
                DataTable table = new DataTable();
                table.Columns.Add("Name", typeof(string));
                table.Columns.Add("Organization", typeof(string));
                table.Columns.Add("Parent Organization", typeof(string));
                table.Columns.Add("Performance Description", typeof(string));

                foreach (var contestant in new ReportContestantsProvider().GetReportContestants(contest))
                {
                    var performers = ServiceFactory.PerformerService.GetContestantPerformers(contestant.ContestantId);

                    var firstPerformer = performers.FirstOrDefault();

                    string organizationName = "";
                    string parentOrganizationName = "";

                    if (firstPerformer != null)
                    {
                        organizationName = firstPerformer.Affiliation.Name;

                        if (firstPerformer.Affiliation.Parent != null)
                        {
                            parentOrganizationName = firstPerformer.Affiliation.Parent.Name;
                        }
                    }

                    table.Rows.Add(
                        contestant.Name,
                        organizationName,
                        parentOrganizationName,
                        contestant.PerformanceDescription);
                }

                sheetDictionary.Add(contest.Name + " (" + contest.Id + ")", table);
            }

            byte[] excelBytes = new ExcelDocumentMaker().MakeNewExcelPackage(sheetDictionary);

            ExcelHttpResponseUtil.MakeResponse(excelBytes, "ContestantAffiliationReport");
        }
    }
}