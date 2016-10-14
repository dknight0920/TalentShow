using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace TalentShow.Tests
{
    [TestClass]
    public class ScoreRangeTests
    {
        [TestMethod]
        public void CreateScoreRange()
        {
            double min = 0;
            double max = 10;

            ScoreRange scoreRange = new ScoreRange(min, max);

            Assert.AreEqual(min, scoreRange.Min);
            Assert.AreEqual(max, scoreRange.Max);
        }
    }
}
