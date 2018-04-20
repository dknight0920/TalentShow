using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShowWeb.Account.Util;
using TalentShowWeb.Models;
using TalentShowWeb.Show.Utils;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Show
{
    public partial class JudgeSheetReport : System.Web.UI.Page
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
                new BreadCrumb(NavUtil.GetShowReportPageUrl(GetShowId()), "Judge Sheet Report", IsActive: true),
            });

            var showId = GetShowId();
            var show = ServiceFactory.ShowService.Get(showId);

            labelPageTitle.Text = show.Name;
            labelPageDescription.Text = show.Description;

            int contestId = Convert.ToInt32(Request.QueryString["contestId"]);

            if(contestId > 0)
                contests = ServiceFactory.ContestService.GetShowContests(showId).Where(c => c.Id == contestId);
            else
                contests = ServiceFactory.ContestService.GetShowContests(showId);

        }

        protected IEnumerable<JudgeSheetReportContestantScoreCard> GetReportContestants(TalentShow.Contest contest)
        {
            var provider = new JudgeSheetReportContestantScoreCardProvider();

            int contestantId = Convert.ToInt32(Request.QueryString["contestantId"]);

            if (contestantId > 0)
                return provider.GetReportContestants(contest, contestantId);
            else
                return provider.GetReportContestants(contest);
        }

        protected string GetContestantURL(int contestantId, TalentShow.Contest contest)
        {
            return NavUtil.GetContestantPageUrl(GetShowId(), contest.Id, contestantId);
        }

        protected string GetJudgeUserName(string userId)
        {
            return new AccountUtil(Context).GetUser(userId).UserName;
        }

        private int GetShowId()
        {
            return Convert.ToInt32(Request.QueryString["showId"]);
        }

        protected void DownloadExcelFile_Click(object sender, EventArgs e)
        {
            new ExcelJudgeSheetReportMaker(contests).Make();
        }
    }
}