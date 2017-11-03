using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;

namespace TalentShowWeb.Utils
{
    internal static class NavUtil
    {
        internal static void GoToShowsPage(HttpResponse Response)
        {
            GoToPage(Response, GetShowsPageUrl());
        }

        internal static string GetShowsPageUrl()
        {
            return "~/Shows.aspx";
        }

        internal static void GoToAddShowPage(HttpResponse Response)
        {
            GoToPage(Response, GetAddShowPageUrl());
        }

        internal static string GetAddShowPageUrl()
        {
            return "~/Show/AddShow.aspx";
        }

        internal static void GoToShowPage(HttpResponse Response, int showId)
        {
            GoToPage(Response, GetShowPageUrl(showId));
        }

        internal static string GetShowPageUrl(int showId)
        {
            return "~/Show/Show.aspx?showId=" + showId;
        }

        internal static void GoToUpdateShowPage(HttpResponse Response, int showId)
        {
            GoToPage(Response, GetUpdateShowPageUrl(showId));
        }

        private static string GetUpdateShowPageUrl(int showId)
        {
            return "~/Show/UpdateShow.aspx?showId=" + showId;
        }

        internal static void GoToContestPage(HttpResponse Response, int showId, int contestId)
        {
            GoToPage(Response, GetContestPageUrl(showId, contestId));
        }

        internal static string GetContestPageUrl(int showId, int contestId)
        {
            return "~/Show/Contest/Contest.aspx?showId=" + showId + "&contestId=" + contestId;
        }

        internal static void GoToContestantPage(HttpResponse Response, int contestantId)
        {
            GoToPage(Response, GetContestantPageUrl(contestantId));
        }

        internal static string GetContestantPageUrl(int contestantId)
        {
            return "~/Show/Contest/Contestant/Contestant.aspx?contestantId=" + contestantId;
        }

        internal static void GoToHomePage(HttpResponse Response)
        {
            GoToPage(Response, "~");
        }

        internal static void GoToLoginPageIfNotAuthorized(HttpResponse Response, IPrincipal User)
        {
            if (!User.Identity.IsAuthenticated)
                GoToLoginPage(Response);
        }

        internal static void GoToLoginPage(HttpResponse Response)
        {
            GoToPage(Response, "~/Account/Login.aspx");
        }

        private static void GoToPage(HttpResponse Response, string path)
        {
            Response.Redirect(path);
        }
    }
}