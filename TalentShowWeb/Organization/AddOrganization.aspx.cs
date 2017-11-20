using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShowWeb.Models;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Organization
{
    public partial class AddOrganization : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            RedirectUtil.RedirectUnauthenticatedUserToLoginPage();
            RedirectUtil.RedirectNonAdminUserToHomePage();

            BreadCrumbUtil.DataBind(Page, new List<BreadCrumb>()
            {
                new BreadCrumb(NavUtil.GetHomePageUrl(), "Home"),
                new BreadCrumb(NavUtil.GetOrganizationsPageUrl(), "Organizations"),
                new BreadCrumb(NavUtil.GetAddOrganizationPageUrl(), "Add Organization", IsActive: true),
            });

            labelPageTitle.Text = "Add an Organization";
            labelPageDescription.Text = "Use the form below to create a new organization.";

            organizationForm.GetSubmitButton().Click += new EventHandler(btnAddOrganization_Click);
            organizationForm.GetCancelButton().Click += new EventHandler(btnCancel_Click);
        }
        protected void Page_PreRender(object sender, EventArgs e)
        {
            PopulateOrganizationsDropDownList();
        }

        private void PopulateOrganizationsDropDownList()
        {
            var organizationsDropDownList = organizationForm.GetOrganizationsDropDownList();

            organizationsDropDownList.Items.Add(new ListItem("-- Select an Organization --", ""));

            var organizations = ServiceFactory.OrganizationService.GetAll();

            foreach (var organization in organizations)
                organizationsDropDownList.Items.Add(new ListItem(organization.Name, Convert.ToString(organization.Id)));

            organizationsDropDownList.Items.FindByValue("").Selected = true;
        }

        protected void btnAddOrganization_Click(object sender, EventArgs e)
        {
            if (!Page.IsValid)
            {
                //TODO
                return;
            }

            var name = organizationForm.GetNameTextBox().Text.Trim();
            var parentOrganizationId = organizationForm.GetOrganizationsDropDownList().SelectedValue;
            var organization = new TalentShow.Organization(name);

            if (!String.IsNullOrWhiteSpace(parentOrganizationId))
                organization.SetParent(ServiceFactory.OrganizationService.Get(Convert.ToInt32(parentOrganizationId)));

            ServiceFactory.OrganizationService.Add(organization);
            GoToOrganizationsPage();
        }

        protected void btnCancel_Click(object sender, EventArgs e)
        {
            GoToOrganizationsPage();
        }

        private void GoToOrganizationsPage()
        {
            NavUtil.GoToOrganizationsPage(Response);
        }
    }
}