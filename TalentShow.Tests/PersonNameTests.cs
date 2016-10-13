using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace TalentShow.Tests
{
    [TestClass]
    public class PersonNameTests
    {
        [TestMethod]
        public void CreateName()
        {
            string firstName = "Jimmy";
            string lastName = "John";

            PersonName name = new PersonName(firstName, lastName);

            Assert.AreEqual(firstName, name.FirstName);
            Assert.AreEqual(lastName, name.LastName);
            Assert.AreEqual(firstName + " " + lastName, name.ToString());
        }
    }
}
