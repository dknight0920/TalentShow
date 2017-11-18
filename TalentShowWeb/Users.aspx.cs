using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShowWeb.Account.Util;
using TalentShowWeb.CustomControls.Models;
using TalentShowWeb.CustomControls.Renderers;
using TalentShowWeb.Utils;

namespace TalentShowWeb
{
    public partial class Users : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var items = new List<HyperlinkListPanelItem>();

            var divisionService = ServiceFactory.DivisionService;

            foreach (var user in new AccountUtil(Context).GetAllUsers())
                items.Add(new HyperlinkListPanelItem(URL: NavUtil.GetUpdateUserPageUrl(user.Id), Heading: user.Email, Text: ""));

            HyperlinkListPanelRenderer.Render(usersList, new HyperlinkListPanelConfig("Users", items));
        }
    }
}