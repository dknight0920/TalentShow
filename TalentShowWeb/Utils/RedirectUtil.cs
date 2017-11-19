using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TalentShowWeb.Account.Util;

namespace TalentShowWeb.Utils
{
    public static class RedirectUtil
    {
        public static void RedirectNonAdminUserToHomePage()
        {
            if (!new AccountUtil(HttpContext.Current).IsUserAnAdmin())
                NavUtil.GoToHomePage(HttpContext.Current.Response);
        }

        public static void RedirectUnauthenticatedUserToLoginPage()
        {
            if (!HttpContext.Current.User.Identity.IsAuthenticated)
                NavUtil.GoToLoginPage(HttpContext.Current.Response);
        }
    }
}