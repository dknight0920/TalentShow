using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI.WebControls;
using TalentShowWeb.Models;
using TalentShowWeb.Show.Utils;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Show
{
    public partial class WinnersReport : System.Web.UI.Page
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

            var showId = GetShowId();
            var show = ServiceFactory.ShowService.Get(showId);

            labelPageTitle.Text = show.Name;
            labelPageDescription.Text = show.Description;

            this.contests = ServiceFactory.ContestService.GetShowContests(showId).Where(c => c.Status == "Complete");
        }

        protected IEnumerable<ReportContestant> GetReportContestants(TalentShow.Contest contest)
        {
            //var numberOfContestants = 4;

            //var topFour = new ReportContestantsProvider().GetReportContestants(contest).Take(numberOfContestants).ToList();

            //while (topFour.Count() != numberOfContestants)
            //    topFour.Add(null);

            // return topFour;

             return new ReportContestantsProvider().GetReportContestants(contest).ToList();
        }

        protected string GetContestantURL(int contestantId, TalentShow.Contest contest)
        {
            return NavUtil.GetContestantPageUrl(GetShowId(), contest.Id, contestantId);
        }

        private int GetShowId()
        {
            return Convert.ToInt32(Request.QueryString["showId"]);
        }
    }
}