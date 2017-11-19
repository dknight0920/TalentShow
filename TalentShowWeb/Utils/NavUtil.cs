using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;

namespace TalentShowWeb.Utils
{
    internal static class NavUtil
    {
        internal static void GoToAddOrganizationPage(HttpResponse Response)
        {
            GoToPage(Response, GetAddOrganizationPageUrl());
        }

        internal static string GetAddOrganizationPageUrl()
        {
            return "~/Organization/AddOrganization.aspx";
        }

        internal static string GetUpdateOrganizationPageUrl(int organizationId)
        {
            return "~/Organization/UpdateOrganization.aspx?organizationId=" + organizationId;
        }

        internal static void GoToOrganizationsPage(HttpResponse Response)
        {
            GoToPage(Response, GetOrganizationsPageUrl());
        }

        internal static string GetOrganizationsPageUrl()
        {
            return "~/Organizations.aspx";
        }

        internal static void GoToAddDivisionPage(HttpResponse Response)
        {
            GoToPage(Response, GetAddDivisionPageUrl());
        }

        internal static string GetAddDivisionPageUrl()
        {
            return "~/Division/AddDivision.aspx";
        }

        internal static void GoToDivisionsPage(HttpResponse Response)
        {
            GoToPage(Response, GetDivisionsPageUrl());
        }

        internal static string GetDivisionsPageUrl()
        {
            return "~/Divisions.aspx";
        }

        internal static string GetUpdateUserPageUrl(string userId)
        {
            return "~/User/UpdateUser.aspx?userId=" + userId;
        }

        internal static void GoToShowsPage(HttpResponse Response)
        {
            GoToPage(Response, GetShowsPageUrl());
        }

        internal static string GetShowsPageUrl()
        {
            return "~/Shows.aspx";
        }

        internal static string GetUpdateDivisionPageUrl(int divisionId)
        {
            return "~/Division/UpdateDivision.aspx?divisionId=" + divisionId;
        }

        internal static void GoToUsersPage(HttpResponse Response)
        {
            GoToPage(Response, GetUsersPageUrl());
        }

        internal static string GetUsersPageUrl()
        {
            return "~/Users.aspx";
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

        internal static string GetUpdateShowPageUrl(int showId)
        {
            return "~/Show/UpdateShow.aspx?showId=" + showId;
        }

        internal static void GoToAddContestPage(HttpResponse Response, int showId)
        {
            GoToPage(Response, GetAddContestPageUrl(showId));
        }

        internal static string GetAddContestPageUrl(int showId)
        {
            return "~/Show/Contest/AddContest.aspx?showId=" + showId;
        }

        internal static void GoToContestPage(HttpResponse Response, int showId, int contestId)
        {
            GoToPage(Response, GetContestPageUrl(showId, contestId));
        }

        internal static string GetContestPageUrl(int showId, int contestId)
        {
            return "~/Show/Contest/Contest.aspx?showId=" + showId + "&contestId=" + contestId;
        }

        internal static void GoToUpdateContestPage(HttpResponse Response, int showId, int contestId)
        {
            GoToPage(Response, GetUpdateContestPageUrl(showId, contestId));
        }

        internal static string GetUpdateContestPageUrl(int showId, int contestId)
        {
            return "~/Show/Contest/UpdateContest.aspx?showId=" + showId + "&contestId=" + contestId;
        }

        internal static void GoToContestantPage(HttpResponse Response, int showId, int contestId, int contestantId)
        {
            GoToPage(Response, GetContestantPageUrl(showId, contestId, contestantId));
        }

        internal static string GetContestantPageUrl(int showId, int contestId, int contestantId)
        {
            return "~/Show/Contest/Contestant/Contestant.aspx?showId=" + showId + "&contestId=" + contestId + "&contestantId=" + contestantId;
        }

        internal static void GoToUpdateContestantPage(HttpResponse Response, int showId, int contestId, int contestantId)
        {
            GoToPage(Response, GetUpdateContestantPageUrl(showId, contestId, contestantId));
        }

        internal static string GetUpdateContestantPageUrl(int showId, int contestId, int contestantId)
        {
            return "~/Show/Contest/Contestant/UpdateContestant.aspx?showId=" + showId + "&contestId=" + contestId + "&contestantId=" + contestantId;
        }

        internal static void GoToAddContestantPage(HttpResponse Response, int showId, int contestId)
        {
            GoToPage(Response, GetAddContestantPageUrl(showId, contestId));
        }

        internal static string GetAddContestantPageUrl(int showId, int contestId)
        {
            return "~/Show/Contest/Contestant/AddContestant.aspx?showId=" + showId + "&contestId=" + contestId;
        }

        internal static void GoToAddPerformerPage(HttpResponse Response, int showId, int contestId, int contestantId)
        {
            GoToPage(Response, GetAddPerformerPageUrl(showId, contestId, contestantId));
        }

        internal static string GetAddPerformerPageUrl(int showId, int contestId, int contestantId)
        {
            return "~/Show/Contest/Contestant/Performer/AddPerformer.aspx?showId=" + showId + "&contestId=" + contestId + "&contestantId=" + contestantId;
        }

        internal static string GetUpdatePerformerPageUrl(int showId, int contestId, int contestantId, int performerId)
        {
            return "~/Show/Contest/Contestant/Performer/UpdatePerformer.aspx?showId=" + showId + "&contestId=" + contestId + "&contestantId=" + contestantId + "&performerId=" + performerId;
        }

        internal static void GoToAddJudgePage(HttpResponse Response, int showId, int contestId)
        {
            GoToPage(Response, GetAddJudgePageUrl(showId, contestId));
        }

        internal static string GetAddJudgePageUrl(int showId, int contestId)
        {
            return "~/Show/Contest/Judge/AddJudge.aspx?showId=" + showId + "&contestId=" + contestId;
        }

        internal static string GetUpdateJudgePageUrl(int showId, int contestId, int judgeId)
        {
            return "~/Show/Contest/Judge/UpdateJudge.aspx?showId=" + showId + "&contestId=" + contestId + "&judgeId=" + judgeId;
        }

        internal static void GoToAddScoreCriterionPage(HttpResponse Response, int showId, int contestId)
        {
            GoToPage(Response, GetAddScoreCriterionPageUrl(showId, contestId));
        }

        internal static string GetAddScoreCriterionPageUrl(int showId, int contestId)
        {
            return "~/Show/Contest/ScoreCriterion/AddScoreCriterion.aspx?showId=" + showId + "&contestId=" + contestId;
        }

        internal static string GetUpdateScoreCriterionPageUrl(int showId, int contestId, int scoreCriterionId)
        {
            return "~/Show/Contest/ScoreCriterion/UpdateScoreCriterion.aspx?showId=" + showId + "&contestId=" + contestId + "&scoreCriterionId=" + scoreCriterionId;
        }

        internal static void GoToHomePage(HttpResponse Response)
        {
            GoToPage(Response, GetHomePageUrl());
        }

        internal static string GetHomePageUrl()
        {
            return "~";
        }

        internal static void GoToLoginPageIfNotAuthorized(HttpResponse Response, IPrincipal User)
        {
            if (!User.Identity.IsAuthenticated)
                GoToLoginPage(Response);
        }

        internal static void GoToLoginPage(HttpResponse Response)
        {
            GoToPage(Response, GetLoginPageUrl());
        }

        internal static string GetLoginPageUrl()
        {
            return "~/Account/Login.aspx";
        }

        private static void GoToPage(HttpResponse Response, string path)
        {
            Response.Redirect(path);
        }
    }
}