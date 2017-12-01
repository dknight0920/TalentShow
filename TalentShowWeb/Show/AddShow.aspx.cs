using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShow.Services;
using TalentShowDataStorage;
using TalentShowWeb.Models;
using TalentShowWeb.Utils;
using ExcelReportUtils;
using TalentShowWeb.Account.Util;
using Microsoft.AspNet.Identity;

namespace TalentShowWeb.Show
{
    public partial class AddShow : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            RedirectUtil.RedirectUnauthenticatedUserToLoginPage();
            RedirectUtil.RedirectNonAdminUserToHomePage();

            BreadCrumbUtil.DataBind(Page, new List<BreadCrumb>()
            {
                new BreadCrumb(NavUtil.GetHomePageUrl(), "Home"),
                new BreadCrumb(NavUtil.GetShowsPageUrl(), "Shows"),
                new BreadCrumb(NavUtil.GetAddShowPageUrl(), "Add Show", IsActive: true),
            });

            labelPageTitle.Text = "Add a Show";
            labelPageDescription.Text = "Use the form below to create a new show.";

            showForm.GetSubmitButton().Click += new EventHandler(btnAddShow_Click);
            showForm.GetCancelButton().Click += new EventHandler(btnCancel_Click);
        }

        protected void btnAddShow_Click(object sender, EventArgs e)
        {
            if (!Page.IsValid)
            {
                //TODO
                return;
            }

            var showName = showForm.GetShowNameTextBox().Text.Trim();
            var description = showForm.GetDescriptionTextBox().Text.Trim();
            var show = new TalentShow.Show(0, showName, description);
            ServiceFactory.ShowService.Add(show);

            var util = new BrushfireAttendeeDocumentUtil(new System.IO.DirectoryInfo(@"C:\Users\Daniel\Documents"), @"\KNIGHTREPORT2017.xlsx");
            var brushFireContests = util.GetContests();

            foreach(var brushFireContest in brushFireContests)
            {
                if (brushFireContest.Contestants.Count() == 0) continue;

                var contest = new TalentShow.Contest(
                    id: 0,
                    name: brushFireContest.Name,
                    description: brushFireContest.Division,
                    timeKeeperId: Context.User.Identity.GetUserId(),
                    maxDuration: new TimeSpan(0, 5, 0),
                    status: "Pending"
                );

                ServiceFactory.ContestService.AddShowContest(show.Id, contest);

                foreach (var brushFireContestant in brushFireContest.Contestants)
                {
                    var contestant = new TalentShow.Contestant(
                        id: 0,
                        performance: new TalentShow.Performance(
                            id: 0,
                            description: brushFireContestant.PerformanceDescription,
                            duration: new TimeSpan(0)
                        ),
                        ruleViolationPenalty: 0
                    );

                    ServiceFactory.ContestantService.AddContestContestant(contest.Id, contestant);

                    foreach (var brushFirePerformer in brushFireContestant.Performers)
                    {
                        int divisionId = 1085;
                        if (brushFireContest.Division == "Omega")
                            divisionId = 1087;
                        if (brushFireContest.Division == "Gamma")
                            divisionId = 1086;

                        ServiceFactory.PerformerService.AddContestantPerformer(contestant.Id, new TalentShow.Performer(
                            id: 0,
                            division: ServiceFactory.DivisionService.Get(divisionId),
                            name: new TalentShow.PersonName(brushFirePerformer.FirstName, brushFirePerformer.LastName),
                            affiliation: ServiceFactory.OrganizationService.Get(2161)
                            )
                        );
                    }
                }
            }

            GoToShowsPage();
        }

        protected void btnCancel_Click(object sender, EventArgs e)
        {
            GoToShowsPage();
        }

        private void GoToShowsPage()
        {
            NavUtil.GoToShowsPage(Response);
        }
    }
}