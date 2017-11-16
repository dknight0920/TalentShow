using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace TalentShow.Tests
{
    [TestClass]
    public class ShowTests
    {
        [TestMethod]
        public void CreateShow()
        {
            string name = "Talent Show 2017";
            Show show = new Show(name);

            Assert.AreEqual(name, show.Name);
            //Assert.AreEqual(0, show.Contests.Count);
        }

        [TestMethod]
        public void AddAndRemoveContestsToShow()
        {
            string name = "Talent Show 2017";
            Show show = new Show(name);

            Contest danceContest = new Contest("Dance", timeKeeperId: "123", maxDuration: new TimeSpan(0, 5, 0));
            Contest vocalContest = new Contest("Vocal", timeKeeperId: "123", maxDuration: new TimeSpan(0, 5, 0));

            //show.Contests.Add(danceContest);

            //Assert.AreEqual(1, show.Contests.Count);

            //show.Contests.Add(vocalContest);

            //Assert.AreEqual(2, show.Contests.Count);

            //show.Contests.Remove(danceContest);

            //Assert.AreEqual(1, show.Contests.Count);

            //show.Contests.Remove(vocalContest);

            //Assert.AreEqual(0, show.Contests.Count);
        }
    }
}
