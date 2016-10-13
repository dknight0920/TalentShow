using System;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections;
using System.Collections.Generic;

namespace TalentShow.Tests
{
    [TestClass]
    public class ContestantTests
    {
        [TestMethod]
        public void CreateContestantWithOnePerformer()
        {
            Contest contest = new Contest(name: "Dance");

            Division division = Division.Alpha;
            PersonName name = new PersonName(firstName: "John", lastName: "Smith");
            string affiliation = "ABC";

            Performer performer = new Performer(division, name, affiliation);

            Performance performance = new Performance(description: "Dancing an abc to xyz", duration: new TimeSpan(hours: 0, minutes: 2, seconds: 0));

            Contestant contestant = new Contestant(contest, performer, performance);

            Assert.AreEqual(contest, contestant.Contest);
            Assert.AreEqual(performer, contestant.Performers.ElementAt(0));
            Assert.AreEqual(performance, contestant.Performance);
        }

        [TestMethod]
        public void CreateContestantWithMultiplePerformers()
        {
            Contest contest = new Contest(name: "Dance");

            Division division = Division.Alpha;
            PersonName name = new PersonName(firstName: "John", lastName: "Smith");
            string affiliation = "ABC";

            Performer performer = new Performer(division, name, affiliation);

            Division division2 = Division.Alpha;
            PersonName name2 = new PersonName(firstName: "Bob", lastName: "Beach");
            string affiliation2 = "XYZ";

            Performer performer2 = new Performer(division2, name2, affiliation2);

            ICollection<Performer> performers = new List<Performer>() { performer, performer2 };

            Performance performance = new Performance(description: "Dancing an abc to xyz", duration: new TimeSpan(hours: 0, minutes: 2, seconds: 0));

            Contestant contestant = new Contestant(contest, performers, performance);

            Assert.AreEqual(contest, contestant.Contest);
            Assert.AreEqual(performer, contestant.Performers.ElementAt(0));
            Assert.AreEqual(performer2, contestant.Performers.ElementAt(1));
            Assert.AreEqual(performance, contestant.Performance);
        }

        [TestMethod]
        [ExpectedException(typeof(ApplicationException))]
        public void CreateContestantWithZeroPerformers()
        {
            Contest contest = new Contest(name: "Dance");

            ICollection<Performer> performers = new List<Performer>();

            Performance performance = new Performance(description: "Dancing an abc to xyz", duration: new TimeSpan(hours: 0, minutes: 2, seconds: 0));

            Contestant contestant = new Contestant(contest, performers, performance);
        }
    }
}
