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
            //Judge Repo
            IRepo<Judge> judgeRepo = new JudgeRepo();

            judgeRepo.DeleteAll();

            //Talent Show
            var show = new Show("Talent Show");

            //Dance Contest
            var danceContest = new Contest("Dance");
            
            //Dance Contestants
            var johnPerformer = new Performer(Division.Alpha, new PersonName("John", "Smith"), "ABC");
            var johnPerformance = new Performance("Dance abc to xyz", duration: new TimeSpan(hours: 0, minutes: 2, seconds: 0));
            var johnDanceContestant = new Contestant(danceContest, johnPerformer, johnPerformance);

            var jimPerformer = new Performer(Division.Alpha, new PersonName("Jim", "Smith"), "ABC");
            var jimPerformance = new Performance("Dance abc1 to xyz1", duration: new TimeSpan(hours: 0, minutes: 2, seconds: 0));
            var jimDanceContestant = new Contestant(danceContest, jimPerformer, jimPerformance);

            danceContest.Contestants.Add(johnDanceContestant);
            danceContest.Contestants.Add(jimDanceContestant);

            //Dance Judges
            var bobJudge = new Judge(new PersonName("Bob", "Hill"), "LMNOP");
            var billJudge = new Judge(new PersonName("Billy", "Bob"), "EFG");

            judgeRepo.Add(bobJudge);
            judgeRepo.Add(billJudge);

            danceContest.Judges.Add(bobJudge);
            danceContest.Judges.Add(billJudge);

            danceContest.ScoreCriteria.Add(new ScoreCriterion("Danced to the beat.", new ScoreRange(0, 10)));

            show.Contests.Add(danceContest);

            //Vocal Contest
            var vocalContest = new Contest("Vocal");

            //Vocal Contestants
            var sandyPerformer = new Performer(Division.Alpha, new PersonName("Sandy", "Smith"), "ABC");
            var sandyPerformance = new Performance("Dance abc to xyz", duration: new TimeSpan(hours: 0, minutes: 2, seconds: 0));
            var sandyVocalContestant = new Contestant(vocalContest, sandyPerformer, sandyPerformance);

            var samPerformer = new Performer(Division.Alpha, new PersonName("Sam", "Smith"), "ABC");
            var samPerformance = new Performance("Dance abc1 to xyz1", duration: new TimeSpan(hours: 0, minutes: 2, seconds: 0));
            var samVocalContestant = new Contestant(vocalContest, samPerformer, samPerformance);

            vocalContest.Contestants.Add(sandyVocalContestant);
            vocalContest.Contestants.Add(samVocalContestant);

            //Dance Judges
            var tomJudge = new Judge(new PersonName("Tom", "Hill"), "LMNOP");
            var timJudge = new Judge(new PersonName("Timmy", "Bob"), "EFG");

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
