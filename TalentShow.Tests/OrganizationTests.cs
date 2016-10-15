using System;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace TalentShow.Tests
{
    [TestClass]
    public class OrganizationTests
    {
        [TestMethod]
        public void CreateOrganizationWithOutParent()
        {
            string name = "ABC Organization";
            Organization organization = new Organization(name);

            Assert.AreEqual(name, organization.Name);
            Assert.IsFalse(organization.HasParent());
        }

        [TestMethod]
        public void CreateOrganizationWithParent()
        {
            string parentName = "Parent Organization";
            Organization parent = new Organization(parentName);

            string name = "ABC Organization";
            Organization organization = new Organization(name, parent);

            Assert.AreEqual(parent, organization.Parent);
            Assert.IsTrue(organization.HasParent());
        }
    }
}