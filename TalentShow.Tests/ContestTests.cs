using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
namespace TalentShow.Tests
{
    [TestClass]
    public class ContestTests
    {
        [TestMethod]
        public void CreateContest()
        {
            string name = "Dance";
            var maxDuration = new TimeSpan(0, 5, 0);
            Contest contest = new Contest(name , timeKeeperId: "123", maxDuration: maxDuration, status: "Pending");
        }
    }
}
