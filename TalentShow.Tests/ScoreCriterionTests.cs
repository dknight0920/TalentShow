using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace TalentShow.Tests
{
    [TestClass]
    public class ScoreCriterionTests
    {
        [TestMethod]
        public void CreateScoreCriterion()
        {
            string criterionDesc = "Pitch";
            double min = 0;
            double max = 10;
            ScoreRange scoreRange = new ScoreRange(min, max);
            ScoreCriterion criterion = new ScoreCriterion(criterionDesc, scoreRange);

            Assert.AreEqual(criterionDesc, criterion.CriterionDescription);
            Assert.AreEqual(min, criterion.ScoreRange.Min);
            Assert.AreEqual(max, criterion.ScoreRange.Max);
        }
    }
}
