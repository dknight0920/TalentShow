using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShow.Services;
using TalentShowDataStorage;
using TalentShowWeb.Account.Util;
using TalentShowWeb.CustomControls.Models;
using TalentShowWeb.CustomControls.Renderers;
using TalentShowWeb.Models;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Show
{
    public partial class Show : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            RedirectUtil.RedirectUnauthenticatedUserToLoginPage();

            BreadCrumbUtil.DataBind(Page, new List<BreadCrumb>()
            {
                new BreadCrumb(NavUtil.GetHomePageUrl(), "Home"),
                new BreadCrumb(NavUtil.GetShowsPageUrl(), "Shows"),
                new BreadCrumb(NavUtil.GetShowPageUrl(GetShowId()), "Show", IsActive: true),
            });

            var items = new List<HyperlinkListPanelItem>();
            var showId = GetShowId();
            var show = ServiceFactory.ShowService.Get(showId);

            labelPageTitle.Text = show.Name;
            labelPageDescription.Text = show.Description;

            var contests = ServiceFactory.ContestService.GetShowContests(showId);

            if (!IsUserAnAdmin())
            {
                var currentUserId = Context.User.Identity.GetUserId();
                contests = contests.Where(c => c.Judges.Any(j => j.UserId == currentUserId) || c.TimeKeeperId == currentUserId).ToList();
            }

            foreach (var contest in contests)
                items.Add(new HyperlinkListPanelItem(URL: NavUtil.GetContestPageUrl(showId, contest.Id), Heading: contest.Name, Text: contest.Description));

            HyperlinkListPanelRenderer.Render(contestsList, new HyperlinkListPanelConfig("Contests", items, ButtonAddContestClick));
        }

        protected bool IsUserAnAdmin()
        {
            return new AccountUtil(Context).IsUserAnAdmin();
        }

        protected void ButtonAddContestClick(object sender, EventArgs evnt)
        {
            NavUtil.GoToAddContestPage(Response, GetShowId());
        }

        protected void btnEdit_Click(object sender, EventArgs e)
        {
            NavUtil.GoToUpdateShowPage(Response, GetShowId());
        }

        protected void btnDelete_Click(object sender, EventArgs e)
        {
            ServiceFactory.ShowService.Delete(GetShowId());
            NavUtil.GoToShowsPage(Response);
        }

        protected void btnViewReport_Click(object sender, EventArgs e)
        {
            NavUtil.GoToShowReportPage(Response, GetShowId());
        }

        private int GetShowId()
        {
            return Convert.ToInt32(Request.QueryString["showId"]);
        }
    }
}