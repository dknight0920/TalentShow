using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow;
using TalentShow.Repos;
using TalentShowDataStorage;

namespace TalentShowConsoleUI
{
    class Program
    {
        //This is just for testing and playing around with ideas
        static void Main(string[] args)
        {
            //Show Repo
            IRepo<Show> showRepo = new ShowRepo();

            showRepo.DeleteAll();

            //Contest Repo
            IRepo<Contest> contestRepo = new ContestRepo();

            contestRepo.DeleteAll();

            //Organization Repo
            IRepo<Organization> organizationRepo = new OrganizationRepo();

            organizationRepo.DeleteAll();

            //Division Repo
            IRepo<Division> divisionRepo = new DivisionRepo();

            divisionRepo.DeleteAll();

            //Contestant Repo
            IRepo<Contestant> contestantRepo = new ContestantRepo();

            contestantRepo.DeleteAll();

            //Performer Repo
            IRepo<Performer> performerRepo = new PerformerRepo();

            performerRepo.DeleteAll();

            //Performance Repo
            IRepo<Performance> performanceRepo = new PerformanceRepo();

            performanceRepo.DeleteAll();

            //PersonName Repo
            IRepo<PersonName> personNameRepo = new PersonNameRepo();

            personNameRepo.DeleteAll();

            //Judge Repo
            IRepo<Judge> judgeRepo = new JudgeRepo();

            judgeRepo.DeleteAll();

            //Score Criterion Repo
            IRepo<ScoreCriterion> scoreCriterionRepo = new ScoreCriterionRepo();

            scoreCriterionRepo.DeleteAll();

            //Talent Show
            var show = new Show("Talent Show");
            showRepo.Add(show);

            //Dance Contest
            var danceContest = new Contest("Dance");

            //Dance Contestants
            var john = new PersonName("John", "Smith");
            personNameRepo.Add(john);
            var abcOrganization = new Organization("ABC");
            organizationRepo.Add(abcOrganization);
            var alphaDivision = new Division("Alpha");
            divisionRepo.Add(alphaDivision);
            var johnPerformer = new Performer(alphaDivision, john, abcOrganization);
            performerRepo.Add(johnPerformer);
            var johnPerformance = new Performance("Dance abc to xyz", duration: new TimeSpan(hours: 0, minutes: 2, seconds: 0));
            performanceRepo.Add(johnPerformance);
            var johnDanceContestant = new Contestant(danceContest, johnPerformer, johnPerformance);

            var jim = new PersonName("Jim", "Smith");
            personNameRepo.Add(jim);
            var gammaDivision = new Division("Gamma");
            divisionRepo.Add(gammaDivision);
            var jimPerformer = new Performer(gammaDivision, jim, abcOrganization);
            performerRepo.Add(jimPerformer);
            var jimPerformance = new Performance("Dance abc1 to xyz1", duration: new TimeSpan(hours: 0, minutes: 2, seconds: 0));
            performanceRepo.Add(jimPerformance);
            var jimDanceContestant = new Contestant(danceContest, jimPerformer, jimPerformance);

            danceContest.Contestants.Add(johnDanceContestant);
            danceContest.Contestants.Add(jimDanceContestant);

            //Dance Judges
            var bob = new PersonName("Bob", "Hill");
            personNameRepo.Add(bob);
            var lmnopOrganization = new Organization("LMNOP");
            organizationRepo.Add(lmnopOrganization);
            var bobJudge = new Judge(bob, lmnopOrganization);
            var bill = new PersonName("Billy", "Bob");
            personNameRepo.Add(bill);
            var efgOrganization = new Organization("EFG");
            organizationRepo.Add(efgOrganization);
            var billJudge = new Judge(bill, efgOrganization);

            judgeRepo.Add(bobJudge);
            judgeRepo.Add(billJudge);

            danceContest.Judges.Add(bobJudge);
            danceContest.Judges.Add(billJudge);

            var danceToTheBeatScoreCriterion = new ScoreCriterion("Danced to the beat.", new ScoreRange(0, 10));
            scoreCriterionRepo.Add(danceToTheBeatScoreCriterion);

            danceContest.ScoreCriteria.Add(danceToTheBeatScoreCriterion);

            contestRepo.Add(danceContest);
            contestantRepo.Add(johnDanceContestant);
            contestantRepo.Add(jimDanceContestant);
            show.Contests.Add(danceContest);

            //Vocal Contest
            var vocalContest = new Contest("Vocal");

            //Vocal Contestants
            var sandy = new PersonName("Sandy", "Smith");
            personNameRepo.Add(sandy);
            var sandyPerformer = new Performer(alphaDivision, sandy, abcOrganization);
            performerRepo.Add(sandyPerformer);
            var sandyPerformance = new Performance("Sing abc", duration: new TimeSpan(hours: 0, minutes: 2, seconds: 0));
            performanceRepo.Add(sandyPerformance);
            var sandyVocalContestant = new Contestant(vocalContest, sandyPerformer, sandyPerformance);

            var sam = new PersonName("Sam", "Smith");
            personNameRepo.Add(sam);
            var omegaDivision = new Division("Omega");
            divisionRepo.Add(omegaDivision);
            var samPerformer = new Performer(omegaDivision, sam, abcOrganization);
            performerRepo.Add(samPerformer);
            var samPerformance = new Performance("Sing xyz", duration: new TimeSpan(hours: 0, minutes: 2, seconds: 0));
            performanceRepo.Add(samPerformance);
            var samVocalContestant = new Contestant(vocalContest, samPerformer, samPerformance);
            
            vocalContest.Contestants.Add(sandyVocalContestant);
            vocalContest.Contestants.Add(samVocalContestant);

            //Dance Judges
            var tom = new PersonName("Tom", "Hill");
            personNameRepo.Add(tom);
            var tomJudge = new Judge(tom, lmnopOrganization);
            var tim = new PersonName("Timmy", "Bob");
            personNameRepo.Add(tim);
            var timJudge = new Judge(tim, efgOrganization);

            vocalContest.Judges.Add(tomJudge);
            vocalContest.Judges.Add(timJudge);

            judgeRepo.Add(tomJudge);
            judgeRepo.Add(timJudge);

            var sangOnPitchScoreCriterion = new ScoreCriterion("Sang on pitch.", new ScoreRange(0, 10));
            scoreCriterionRepo.Add(sangOnPitchScoreCriterion);

            vocalContest.ScoreCriteria.Add(sangOnPitchScoreCriterion);

            contestRepo.Add(vocalContest);
            contestantRepo.Add(sandyVocalContestant);
            contestantRepo.Add(samVocalContestant);

            show.Contests.Add(vocalContest);

            foreach (var contest in show.Contests)
            {
                foreach (var contestant in contest.Contestants)
                {
                    foreach (var judge in contest.Judges)
                    {
                        var scoreCard = contest.GetBlankScoreCard(contestant, judge);

                        foreach (var scorableCriterion in scoreCard.ScorableCriteria)
                        {
                            scorableCriterion.SetScoreAndComment(10, "This is a comment.");
                        }

                        contest.ScoreCards.Add(scoreCard);
                    }
                }
            }

            foreach (var contest in show.Contests)
            {
                Console.WriteLine(contest.Name);

                foreach (var contestant in contest.Contestants)
                {
                    foreach (var performer in contestant.Performers)
                    {
                        Console.WriteLine("\t" + performer.Name.ToString());
                    }
                    Console.WriteLine("\t\t" + contestant.Performance.Description);
                    Console.WriteLine("\t\tScore: " + contestant.Score);
                    foreach (var scoreCard in contest.ScoreCards.Where(s => s.Contestant == contestant))
                    {
                        Console.WriteLine("\t\t\t" + scoreCard.Judge.Name.ToString());
                        Console.WriteLine("\t\t\t" + scoreCard.AverageScore);
                        foreach (var scorableCriterion in scoreCard.ScorableCriteria)
                        {
                            Console.WriteLine("\t\t\t\t" + scorableCriterion.ScoreCriterion.CriterionDescription);
                            Console.WriteLine("\t\t\t\t" + scorableCriterion.Score);
                            Console.WriteLine("\t\t\t\t" + scorableCriterion.Comment);
                        }
                    }
                }
            }

            Console.WriteLine();

            Console.WriteLine("All Judges");

            foreach (Judge judge in judgeRepo.GetAll())
            {
                Console.WriteLine(judge.Name.ToString());
                Console.WriteLine("\t" + (judge.Affiliation != null ? judge.Affiliation.Name : ""));
            }

            Console.WriteLine();

            Console.WriteLine("All Person Names");

            foreach (PersonName name in personNameRepo.GetAll())
            {
                Console.WriteLine(name.ToString());
            }

            Console.WriteLine();

            Console.WriteLine("All Organizations");

            foreach (Organization organization in organizationRepo.GetAll())
            {
                Console.WriteLine(organization.Name);
            }

            Console.WriteLine();

            Console.WriteLine("All Shows");

            foreach (Show talentShow in showRepo.GetAll())
            {
                Console.WriteLine(talentShow.Name);
            }

            Console.WriteLine();

            Console.WriteLine("All Contests");

            foreach (Contest contest in contestRepo.GetAll())
            {
                Console.WriteLine(contest.Name);
                foreach (Judge judge in contest.Judges)
                {
                    Console.WriteLine("\t" + judge.Name.ToString());
                }
            }

            Console.WriteLine();

            Console.WriteLine("All Divisions");

            foreach (Division division in divisionRepo.GetAll())
            {
                Console.WriteLine(division.Name);
            }

            Console.WriteLine();

            Console.WriteLine("All Contestants");

            foreach (Contestant contestant in contestantRepo.GetAll())
            {
                Console.WriteLine(contestant.Contest.Name);
                Console.WriteLine(contestant.Performance.Description);
                Console.WriteLine(contestant.Performance.Duration);

                foreach (Performer performer in contestant.Performers)
                {
                    Console.WriteLine("\t" + performer.Division.Name);
                    Console.WriteLine("\t" + performer.Name.ToString());
                }
            }

            Console.WriteLine();

            Console.WriteLine("All Performers");

            foreach (Performer performer in performerRepo.GetAll())
            {
                Console.WriteLine(performer.Division.Name);
                Console.WriteLine(performer.Name.ToString());
            }

            Console.WriteLine();

            Console.WriteLine("All Performances");

            foreach (Performance performance in performanceRepo.GetAll())
            {
                Console.WriteLine(performance.Description);
                Console.WriteLine("\t" + performance.Duration.TotalMinutes + " minutes");
            }

            Console.WriteLine();

            Console.WriteLine("All Score Criteria");

            foreach (ScoreCriterion scoreCriterion in scoreCriterionRepo.GetAll())
            {
                Console.WriteLine(scoreCriterion.CriterionDescription);
                Console.WriteLine("\t" + scoreCriterion.ScoreRange.Min);
                Console.WriteLine("\t" + scoreCriterion.ScoreRange.Max);
            }

            Console.ReadLine();
        }
    }
}
