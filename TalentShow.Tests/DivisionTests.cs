using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace TalentShow.Tests
{
    [TestClass]
    public class DivisionTests
    {
        [TestMethod]
        public void CreateDivision()
        {
            string name = "Alpha";
            Division division = new Division(name);

            Assert.AreEqual(name, division.Name);
        }
    }
}
