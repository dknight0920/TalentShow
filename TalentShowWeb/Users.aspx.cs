using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShowWeb.Account.Util;
using TalentShowWeb.CustomControls.Models;
using TalentShowWeb.CustomControls.Renderers;
using TalentShowWeb.Models;
using TalentShowWeb.Utils;

namespace TalentShowWeb
{
    public partial class Users : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            RedirectUtil.RedirectUnauthenticatedUserToLoginPage();
            RedirectUtil.RedirectNonAdminUserToHomePage();

            BreadCrumbUtil.DataBind(Page, new List<BreadCrumb>()
            {
                new BreadCrumb(NavUtil.GetHomePageUrl(), "Home"),
                new BreadCrumb(NavUtil.GetUsersPageUrl(), "Users", IsActive: true),
            });

            var items = new List<HyperlinkListPanelItem>();

            var divisionService = ServiceFactory.DivisionService;

            var accountUtil = new AccountUtil(Context);

            foreach (var user in new AccountUtil(Context).GetAllUsers().OrderBy(u => u.Email))
                items.Add(new HyperlinkListPanelItem(
                    URL: NavUtil.GetUpdateUserPageUrl(user.Id), 
                    Heading: user.UserName + (accountUtil.IsUserAnAdmin(user.Id) ? " (Administrator)" : ""), 
                    Text: user.Email));

            HyperlinkListPanelRenderer.Render(usersList, new HyperlinkListPanelConfig("Users", items));
        }
    }
}