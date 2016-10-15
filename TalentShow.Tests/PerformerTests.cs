using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace TalentShow.Tests
{
    [TestClass]
    public class PerformerTests
    {
        [TestMethod]
        public void CreatePerformer()
        {
            Division division = Division.Alpha;
            PersonName name = new PersonName(firstName: "John", lastName: "Smith");
            Organization affiliation = new Organization("ABC");

            Performer performer = new Performer(division, name, affiliation);

            Assert.AreEqual(division, performer.Division);
            Assert.AreEqual(name, performer.Name);
            Assert.AreEqual(affiliation, performer.Affiliation);
        }
    }
}
