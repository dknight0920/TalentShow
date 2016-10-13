using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace TalentShow.Tests
{
    [TestClass]
    public class PerformanceTests
    {
        [TestMethod]
        public void CreatePerformance()
        {
            string description = "Dancing";
            TimeSpan duration = new TimeSpan(hours: 0, minutes: 3, seconds: 0);

            Performance performance = new Performance(description, duration);

            Assert.AreEqual(description, performance.Description);
            Assert.AreEqual(duration, performance.Duration);
        }
    }
}