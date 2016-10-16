using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace TalentShow.Tests
{
    [TestClass]
    public class ScoreCardTests
    {
        [TestMethod]
        public void CreateScoreCard()
        {
            ScoreRange scoreRange = new ScoreRange(0, 100);
            ScoreCriterion scoreCriterion = new ScoreCriterion("This is a description.", scoreRange);
            ScorableCriterion scorableCriterion = new ScorableCriterion(scoreCriterion);

            ScoreCriterion scoreCriterion2 = new ScoreCriterion("This is another description.", scoreRange);
            ScorableCriterion scorableCriterion2 = new ScorableCriterion(scoreCriterion2);

            ICollection<ScorableCriterion> scorableCriteria = new List<ScorableCriterion>() { scorableCriterion, scorableCriterion2 };

            Contest contest = new Contest("Talent Show");
            Performer performer = new Performer(new Division("Alpha"), new PersonName(firstName: "Jim", lastName: "Dale"), new Organization("XYZ"));
            Performance performance = new Performance("Singing a song.", new TimeSpan(hours: 0, minutes: 4, seconds: 0));
            Contestant contestant = new Contestant(contest, performer, performance);
            Judge judge = new Judge(new PersonName(firstName: "Sam", lastName: "Bam"), new Organization("ABC"));

            ScoreCard scoreCard = new ScoreCard(contestant, judge, scorableCriteria);

            double score1 = 50;
            double score2 = 75;
            double average = new List<double>() { score1, score2 }.Average();

            scoreCard.ScorableCriteria.ElementAt(0).SetScoreAndComment(score1, "Not very good.");
            scoreCard.ScorableCriteria.ElementAt(1).SetScoreAndComment(score2, "Pretty good.");

            Assert.AreEqual(2, scoreCard.ScorableCriteria.Count);
            Assert.AreEqual(score1, scoreCard.ScorableCriteria.ElementAt(0).Score);
            Assert.AreEqual(scoreCriterion, scoreCard.ScorableCriteria.ElementAt(0).ScoreCriterion);
            Assert.AreEqual(score2, scoreCard.ScorableCriteria.ElementAt(1).Score);
            Assert.AreEqual(scoreCriterion2, scoreCard.ScorableCriteria.ElementAt(1).ScoreCriterion);
            Assert.AreEqual(average, scoreCard.AverageScore);
            Assert.AreEqual(contestant, scoreCard.Contestant);
            Assert.AreEqual(judge, scoreCard.Judge);
        }
    }
}
