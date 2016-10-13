using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace TalentShow.Tests
{
    [TestClass]
    public class JudgeTests
    {
        [TestMethod]
        public void CreateJudge()
        {
            PersonName name = new PersonName(firstName: "Jeff", lastName: "Beach");
            string affiliation = "XYZ";

            Judge judge = new Judge(name, affiliation);

            Assert.AreEqual(name, judge.Name);
            Assert.AreEqual(affiliation, judge.Affiliation);
        }
    }
}