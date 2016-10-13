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

            Contest contest = new Contest(name);
        }
    }
}
