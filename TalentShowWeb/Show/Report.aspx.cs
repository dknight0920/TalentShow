using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShow;
using TalentShowWeb.Models;
using TalentShowWeb.Show.Utils;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Show
{
    public partial class Report : System.Web.UI.Page
    {
        public IEnumerable<TalentShow.Contest> contests; 

        protected void Page_Load(object sender, EventArgs e)
        {
            RedirectUtil.RedirectUnauthenticatedUserToLoginPage();
            RedirectUtil.RedirectNonAdminUserToHomePage();

            BreadCrumbUtil.DataBind(Page, new List<BreadCrumb>()
            {
                new BreadCrumb(NavUtil.GetHomePageUrl(), "Home"),
                new BreadCrumb(NavUtil.GetShowsPageUrl(), "Shows"),
                new BreadCrumb(NavUtil.GetShowPageUrl(GetShowId()), "Show"),
                new BreadCrumb(NavUtil.GetShowReportPageUrl(GetShowId()), "Report", IsActive: true),
            });

            if (Page.IsPostBack)
            {
                var refreshRate = (Convert.ToInt32(dropDownListRefreshRate.SelectedValue) * 60) * 1000;
                refreshTimer.Interval = refreshRate;
            }
            else
            {
                dropDownListRefreshRate.SelectedValue = "5";
                refreshTimer.Interval = 300000;
                dropDownListStatus.SelectedValue = "In Progress";
            }

            var showId = GetShowId();
            var show = ServiceFactory.ShowService.Get(showId);

            labelPageTitle.Text = show.Name;
            labelPageDescription.Text = show.Description;

            this.contests = ServiceFactory.ContestService.GetShowContests(showId);

            var status = dropDownListStatus.SelectedValue;

            if (status != "Any")
                this.contests = this.contests.Where(c => c.Status == status);
        }

        protected IEnumerable<ReportContestant> GetReportContestants(TalentShow.Contest contest)
        {
            return new ReportContestantsProvider().GetReportContestants(contest);
        }

        protected string GetContestantURL(int contestantId, TalentShow.Contest contest)
        {
            return NavUtil.GetContestantPageUrl(GetShowId(), contest.Id, contestantId);
        }

        private int GetShowId()
        {
            return Convert.ToInt32(Request.QueryString["showId"]);
        }

        protected void DownloadExcelFile_Click(object sender, EventArgs e)
        {
            new ExcelSummaryReportMaker(contests).Make();
        }
    }
}