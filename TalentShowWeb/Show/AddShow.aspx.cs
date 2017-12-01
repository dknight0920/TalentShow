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
            ImportContests(show);

            GoToShowsPage();
        }

        private void ImportContests(TalentShow.Show show)
        {
            var util = new BrushfireAttendeeDocumentUtil(new System.IO.DirectoryInfo(@"C:\Users\Daniel\Documents"), @"\KNIGHTREPORT2017.xlsx");
            var brushFireContests = util.GetContests();
            var users = new AccountUtil(Context).GetAllUsers().Take(4);
            var judges = new List<TalentShow.Judge>();

            foreach (var user in users)
                judges.Add(new TalentShow.Judge(id: 0, userId: user.Id));

            foreach (var brushFireContest in brushFireContests)
            {
                if (brushFireContest.Contestants.Count() == 0) continue;

                //Add Contest
                var contest = new TalentShow.Contest(
                    id: 0,
                    name: brushFireContest.Name,
                    description: brushFireContest.Division,
                    timeKeeperId: Context.User.Identity.GetUserId(),
                    maxDuration: new TimeSpan(0, 5, 0),
                    status: "Pending"
                );

                ServiceFactory.ContestService.AddShowContest(show.Id, contest);

                //Add Judges to Contest
                foreach (var judge in judges)
                    ServiceFactory.JudgeService.AddContestJudge(contest.Id, judge);

                //Add Score Criteria to Contest
                var scoreCriteria = new List<TalentShow.ScoreCriterion>()
                {
                    new TalentShow.ScoreCriterion(id: 0, criterionDescription: "Selection & Communication", scoreRange: new TalentShow.ScoreRange(0, 10)),
                    new TalentShow.ScoreCriterion(id: 0, criterionDescription: "Technique, Intonation", scoreRange: new TalentShow.ScoreRange(0, 10)),
                    new TalentShow.ScoreCriterion(id: 0, criterionDescription: "Overall Presentation", scoreRange: new TalentShow.ScoreRange(0, 10)),
                    new TalentShow.ScoreCriterion(id: 0, criterionDescription: "Diction", scoreRange: new TalentShow.ScoreRange(0, 10)),
                    new TalentShow.ScoreCriterion(id: 0, criterionDescription: "Musical Effect Communication", scoreRange: new TalentShow.ScoreRange(0, 10)),
                };

                foreach (var scoreCriterion in scoreCriteria)
                    ServiceFactory.ScoreCriterionService.AddContestScoreCriterion(contest.Id, scoreCriterion);

                //Add Contestants to Contest
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

                    //Add Performers to Contestant
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

                    //Add Score Cards to Contestant
                    var scorableCriteria = new List<TalentShow.ScorableCriterion>();

                    foreach (var scoreCriterion in scoreCriteria)
                        scorableCriteria.Add(new TalentShow.ScorableCriterion(id: 0, scoreCriterion: scoreCriterion));

                    foreach (var judge in judges)
                    {
                        ServiceFactory.ScoreCardService.Add(
                            new TalentShow.ScoreCard(
                                id: 0,
                                contestant: contestant,
                                judge: judge,
                                scorableCriteria: scorableCriteria
                            )
                        );
                    }
                }
            }
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