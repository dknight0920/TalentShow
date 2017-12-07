using ExcelReportUtils;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using TalentShowWeb.Account.Util;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Show.Utils
{
    public static class ShowDataImporter
    {
        public static void Import(TalentShow.Show show, Stream fileStream)
        {
            var context = HttpContext.Current;
            var util = new BrushfireAttendeeDocumentUtil(fileStream);
            var brushFireContests = util.GetContests();      
            var divisions = ServiceFactory.DivisionService.GetAll();

            if (divisions.FirstOrDefault(d => d.Name.ToUpper().Trim() == "ALPHA") == null ||
                divisions.FirstOrDefault(d => d.Name.ToUpper().Trim() == "GAMMA") == null ||
                divisions.FirstOrDefault(d => d.Name.ToUpper().Trim() == "OMEGA") == null)
            {
                throw new ApplicationException("To Import Data from Excel you must have Divisions: Alpha, Gamma, and Omega.");
            }

            var defaultOrganization = ServiceFactory.OrganizationService.GetAll().FirstOrDefault(o => o.Name.ToUpper().Trim() == "UNKNOWN");

            if (defaultOrganization == null)
            {
                throw new ApplicationException("To Import Data from Excel you must have an Organization named \"UNKNOWN\".");
            }

            //var users = new AccountUtil(context).GetAllUsers().Take(4);
            //var judges = new List<TalentShow.Judge>();

            //foreach (var user in users)
                //judges.Add(new TalentShow.Judge(id: 0, userId: user.Id));

            foreach (var brushFireContest in brushFireContests)
            {
                if (brushFireContest.Contestants.Count() == 0) continue;

                //Add Contest
                var contest = new TalentShow.Contest(
                    id: 0,
                    name: ConvertToTitleCase(brushFireContest.Name),
                    description: ConvertToTitleCase(brushFireContest.Division),
                    timeKeeperId: context.User.Identity.GetUserId(),
                    maxDuration: new TimeSpan(0, 5, 0),
                    status: "Pending"
                );

                ServiceFactory.ContestService.AddShowContest(show.Id, contest);

                //Add Judges to Contest
                //foreach (var judge in judges)
                    //ServiceFactory.JudgeService.AddContestJudge(contest.Id, judge);

                //Add Score Criteria to Contest
                var scoreCriteria = new List<TalentShow.ScoreCriterion>();

                if (brushFireContest.ScoreCriteria.Any())
                {
                    foreach (var criterion in brushFireContest.ScoreCriteria)
                    {
                        scoreCriteria.Add(new TalentShow.ScoreCriterion(
                                id: 0,
                                criterionDescription: ConvertToTitleCase(criterion.Description),
                                scoreRange: new TalentShow.ScoreRange(criterion.Min, criterion.Max)
                            )
                        );
                    }
                }
                else
                {
                    scoreCriteria.Add(new TalentShow.ScoreCriterion(id: 0, criterionDescription: "Selection & Communication", scoreRange: new TalentShow.ScoreRange(0, 10)));
                    scoreCriteria.Add(new TalentShow.ScoreCriterion(id: 0, criterionDescription: "Technique, Intonation", scoreRange: new TalentShow.ScoreRange(0, 10)));
                    scoreCriteria.Add(new TalentShow.ScoreCriterion(id: 0, criterionDescription: "Overall Presentation", scoreRange: new TalentShow.ScoreRange(0, 10)));
                    scoreCriteria.Add(new TalentShow.ScoreCriterion(id: 0, criterionDescription: "Diction", scoreRange: new TalentShow.ScoreRange(0, 10)));
                    scoreCriteria.Add(new TalentShow.ScoreCriterion(id: 0, criterionDescription: "Musical Effect Communication", scoreRange: new TalentShow.ScoreRange(0, 10)));
                }

                foreach (var scoreCriterion in scoreCriteria)
                    ServiceFactory.ScoreCriterionService.AddContestScoreCriterion(contest.Id, scoreCriterion);

                //Add Contestants to Contest
                foreach (var brushFireContestant in brushFireContest.Contestants)
                {
                    var contestant = new TalentShow.Contestant(
                        id: 0,
                        performance: new TalentShow.Performance(
                            id: 0,
                            description: ConvertToTitleCase(brushFireContestant.PerformanceDescription),
                            duration: new TimeSpan(0)
                        ),
                        ruleViolationPenalty: 0
                    );

                    ServiceFactory.ContestantService.AddContestContestant(contest.Id, contestant);

                    //Add Performers to Contestant
                    foreach (var brushFirePerformer in brushFireContestant.Performers)
                    {
                        int divisionId = divisions.First(d => d.Name.ToUpper().Trim() == brushFireContest.Division.ToUpper().Trim()).Id;

                        ServiceFactory.PerformerService.AddContestantPerformer(contestant.Id, new TalentShow.Performer(
                            id: 0,
                            division: ServiceFactory.DivisionService.Get(divisionId),
                            name: new TalentShow.PersonName(ConvertToTitleCase(brushFirePerformer.FirstName), ConvertToTitleCase(brushFirePerformer.LastName)),
                            affiliation: ServiceFactory.OrganizationService.Get(defaultOrganization.Id)
                            )
                        );
                    }

                    //Add Score Cards to Contestant
                    /*
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
                    */
                }
            }
        }

        public static void MockImport(TalentShow.Show show, Stream fileStream)
        {
            var context = HttpContext.Current;
            var util = new BrushfireAttendeeDocumentUtil(fileStream);
            var brushFireContests = util.GetContests();
            var divisions = ServiceFactory.DivisionService.GetAll();

            if (divisions.FirstOrDefault(d => d.Name.ToUpper().Trim() == "ALPHA") == null ||
                divisions.FirstOrDefault(d => d.Name.ToUpper().Trim() == "GAMMA") == null ||
                divisions.FirstOrDefault(d => d.Name.ToUpper().Trim() == "OMEGA") == null)
            {
                throw new ApplicationException("To Import Data from Excel you must have Divisions: Alpha, Gamma, and Omega.");
            }

            var defaultOrganization = ServiceFactory.OrganizationService.GetAll().FirstOrDefault(o => o.Name.ToUpper().Trim() == "UNKNOWN");

            if (defaultOrganization == null)
            {
                throw new ApplicationException("To Import Data from Excel you must have an Organization named \"UNKNOWN\".");
            }

            var users = new AccountUtil(context).GetAllUsers().Take(4);
            var judges = new List<TalentShow.Judge>();

            foreach (var user in users)
            judges.Add(new TalentShow.Judge(id: 0, userId: user.Id));

            foreach (var brushFireContest in brushFireContests)
            {
                if (brushFireContest.Contestants.Count() == 0) continue;

                //Add Contest
                var contest = new TalentShow.Contest(
                    id: 0,
                    name: ConvertToTitleCase(brushFireContest.Name),
                    description: ConvertToTitleCase(brushFireContest.Division),
                    timeKeeperId: context.User.Identity.GetUserId(),
                    maxDuration: new TimeSpan(0, 5, 0),
                    status: "Complete"
                );

                ServiceFactory.ContestService.AddShowContest(show.Id, contest);

                //Add Judges to Contest
                foreach (var judge in judges)
                ServiceFactory.JudgeService.AddContestJudge(contest.Id, judge);

                //Add Score Criteria to Contest
                var scoreCriteria = new List<TalentShow.ScoreCriterion>();

                if (brushFireContest.ScoreCriteria.Any())
                {
                    foreach (var criterion in brushFireContest.ScoreCriteria)
                    {
                        scoreCriteria.Add(new TalentShow.ScoreCriterion(
                                id: 0,
                                criterionDescription: ConvertToTitleCase(criterion.Description),
                                scoreRange: new TalentShow.ScoreRange(criterion.Min, criterion.Max)
                            )
                        );
                    }
                }
                else
                {
                    scoreCriteria.Add(new TalentShow.ScoreCriterion(id: 0, criterionDescription: "Selection & Communication", scoreRange: new TalentShow.ScoreRange(0, 10)));
                    scoreCriteria.Add(new TalentShow.ScoreCriterion(id: 0, criterionDescription: "Technique, Intonation", scoreRange: new TalentShow.ScoreRange(0, 10)));
                    scoreCriteria.Add(new TalentShow.ScoreCriterion(id: 0, criterionDescription: "Overall Presentation", scoreRange: new TalentShow.ScoreRange(0, 10)));
                    scoreCriteria.Add(new TalentShow.ScoreCriterion(id: 0, criterionDescription: "Diction", scoreRange: new TalentShow.ScoreRange(0, 10)));
                    scoreCriteria.Add(new TalentShow.ScoreCriterion(id: 0, criterionDescription: "Musical Effect Communication", scoreRange: new TalentShow.ScoreRange(0, 10)));
                }

                foreach (var scoreCriterion in scoreCriteria)
                    ServiceFactory.ScoreCriterionService.AddContestScoreCriterion(contest.Id, scoreCriterion);

                //Add Contestants to Contest
                foreach (var brushFireContestant in brushFireContest.Contestants)
                {
                    var contestant = new TalentShow.Contestant(
                        id: 0,
                        performance: new TalentShow.Performance(
                            id: 0,
                            description: ConvertToTitleCase(brushFireContestant.PerformanceDescription),
                            duration: new TimeSpan(0, new Random().Next(0, 6), new Random().Next(10, 35))
                        ),
                        ruleViolationPenalty: 0
                    );

                    ServiceFactory.ContestantService.AddContestContestant(contest.Id, contestant);

                    //Add Performers to Contestant
                    foreach (var brushFirePerformer in brushFireContestant.Performers)
                    {
                        int divisionId = divisions.First(d => d.Name.ToUpper().Trim() == brushFireContest.Division.ToUpper().Trim()).Id;

                        ServiceFactory.PerformerService.AddContestantPerformer(contestant.Id, new TalentShow.Performer(
                            id: 0,
                            division: ServiceFactory.DivisionService.Get(divisionId),
                            name: new TalentShow.PersonName(ConvertToTitleCase(brushFirePerformer.FirstName), ConvertToTitleCase(brushFirePerformer.LastName)),
                            affiliation: ServiceFactory.OrganizationService.Get(defaultOrganization.Id)
                            )
                        );
                    }

                    //Add Score Cards to Contestant
                    var scorableCriteria = new List<TalentShow.ScorableCriterion>();

                    var scoreGen = new Random();

                    foreach (var scoreCriterion in scoreCriteria)
                    {
                        var scorableCriterion = new TalentShow.ScorableCriterion(id: 0, scoreCriterion: scoreCriterion);

                        scorableCriteria.Add(scorableCriterion);

                        scorableCriterion.SetScore(scoreGen.Next(1, 10));
                        scorableCriterion.SetComment("This is a test comment.");
                    }

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

        private static string ConvertToTitleCase(string s)
        {
            s = s.ToLower();
            return Regex.Replace(s, @"(^\w)|(\s\w)", m => m.Value.ToUpper());
        }
    }
}