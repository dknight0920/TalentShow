using System;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using TalentShow.Repos;

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

    public class MockJudgeRepo : IJudgeRepo
    {
        private static int id = 0;

        public void Add(Judge judge)
        {
            
        }

        public ICollection<Judge> GetAll()
        {
            return new List<Judge>();
        }

        public int GetNextId()
        {
            return ++id;
        }
    }
}