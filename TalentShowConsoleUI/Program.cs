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
            //PersonName Repo
            IRepo<PersonName> personNameRepo = new PersonNameRepo();

            personNameRepo.DeleteAll();

            //Judge Repo
            IRepo<Judge> judgeRepo = new JudgeRepo();

            judgeRepo.DeleteAll();

            //Talent Show
            var show = new Show("Talent Show");

            //Dance Contest
            var danceContest = new Contest("Dance");

            //Dance Contestants
            var john = new PersonName("John", "Smith");
            personNameRepo.Add(john);
            var johnPerformer = new Performer(Division.Alpha, john, new Organization("ABC"));
            var johnPerformance = new Performance("Dance abc to xyz", duration: new TimeSpan(hours: 0, minutes: 2, seconds: 0));
            var johnDanceContestant = new Contestant(danceContest, johnPerformer, johnPerformance);

            var jim = new PersonName("Jim", "Smith");
            personNameRepo.Add(jim);
            var jimPerformer = new Performer(Division.Alpha, jim, new Organization("ABC"));
            var jimPerformance = new Performance("Dance abc1 to xyz1", duration: new TimeSpan(hours: 0, minutes: 2, seconds: 0));
            var jimDanceContestant = new Contestant(danceContest, jimPerformer, jimPerformance);

            danceContest.Contestants.Add(johnDanceContestant);
            danceContest.Contestants.Add(jimDanceContestant);

            //Dance Judges
            var bob = new PersonName("Bob", "Hill");
            personNameRepo.Add(bob);
            var bobJudge = new Judge(bob, new Organization("LMNOP"));
            var bill = new PersonName("Billy", "Bob");
            personNameRepo.Add(bill);
            var billJudge = new Judge(bill, new Organization("EFG"));

            judgeRepo.Add(bobJudge);
            judgeRepo.Add(billJudge);

            danceContest.Judges.Add(bobJudge);
            danceContest.Judges.Add(billJudge);

            danceContest.ScoreCriteria.Add(new ScoreCriterion("Danced to the beat.", new ScoreRange(0, 10)));

            show.Contests.Add(danceContest);

            //Vocal Contest
            var vocalContest = new Contest("Vocal");

            //Vocal Contestants
            var sandy = new PersonName("Sandy", "Smith");
            personNameRepo.Add(sandy);
            var sandyPerformer = new Performer(Division.Alpha, sandy, new Organization("ABC"));
            var sandyPerformance = new Performance("Dance abc to xyz", duration: new TimeSpan(hours: 0, minutes: 2, seconds: 0));
            var sandyVocalContestant = new Contestant(vocalContest, sandyPerformer, sandyPerformance);

            var sam = new PersonName("Sam", "Smith");
            personNameRepo.Add(sam);
            var samPerformer = new Performer(Division.Alpha, sam, new Organization("ABC"));
            var samPerformance = new Performance("Dance abc1 to xyz1", duration: new TimeSpan(hours: 0, minutes: 2, seconds: 0));
            var samVocalContestant = new Contestant(vocalContest, samPerformer, samPerformance);

            vocalContest.Contestants.Add(sandyVocalContestant);
            vocalContest.Contestants.Add(samVocalContestant);

            //Dance Judges
            var tom = new PersonName("Tom", "Hill");
            personNameRepo.Add(tom);
            var tomJudge = new Judge(tom, new Organization("LMNOP"));
            var tim = new PersonName("Timmy", "Bob");
            personNameRepo.Add(tim);
            var timJudge = new Judge(tim, new Organization("EFG"));

            vocalContest.Judges.Add(tomJudge);
            vocalContest.Judges.Add(timJudge);

            judgeRepo.Add(tomJudge);
            judgeRepo.Add(timJudge);

            vocalContest.ScoreCriteria.Add(new ScoreCriterion("Sang on pitch.", new ScoreRange(0, 10)));

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

            foreach (Judge judge in judgeRepo.GetAll())
            {
                Console.WriteLine(judge.Name.ToString());
            }

            Console.ReadLine();
        }
    }
}
