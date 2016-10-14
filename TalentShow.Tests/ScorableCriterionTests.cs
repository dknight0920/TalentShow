using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace TalentShow.Tests
{
    [TestClass]
    public class ScorableCriterionTests
    {
        [TestMethod]
        public void CreateScorableCriterion()
        {
            ScoreRange scoreRange = new ScoreRange(0, 100);
            ScoreCriterion scoreCriterion = new ScoreCriterion("This is a description.", scoreRange);

            ScorableCriterion scorableCriterion = new ScorableCriterion(scoreCriterion);

            double score = 99;
            string comment = "This is a comment about the score.";

            scorableCriterion.SetScoreAndComment(score, comment);

            Assert.AreEqual(score, scorableCriterion.Score);
            Assert.AreEqual(comment, scorableCriterion.Comment);
        }

        [TestMethod]
        [ExpectedException(typeof(ApplicationException))]
        public void AttemptToSetScoreHigherThanScoreMax()
        {
            ScoreRange scoreRange = new ScoreRange(0, 100);
            ScoreCriterion scoreCriterion = new ScoreCriterion("This is a description.", scoreRange);

            ScorableCriterion scorableCriterion = new ScorableCriterion(scoreCriterion);

            double score = 101;

            scorableCriterion.SetScoreAndComment(score, "");
        }
    }
}
