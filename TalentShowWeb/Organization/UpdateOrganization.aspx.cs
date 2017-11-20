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
    public partial class UpdateOrganization : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            RedirectUtil.RedirectUnauthenticatedUserToLoginPage();
            RedirectUtil.RedirectNonAdminUserToHomePage();

            BreadCrumbUtil.DataBind(Page, new List<BreadCrumb>()
            {
                new BreadCrumb(NavUtil.GetHomePageUrl(), "Home"),
                new BreadCrumb(NavUtil.GetOrganizationsPageUrl(), "Organizations"),
                new BreadCrumb(NavUtil.GetUpdateOrganizationPageUrl(GetOrganizationId()), "Update Organization", IsActive: true),
            });

            labelPageTitle.Text = "Update the Organization";
            labelPageDescription.Text = "Use the form below to update the organization.";

            organizationForm.GetSubmitButton().Click += new EventHandler(btnUpdateOrganization_Click);
            organizationForm.GetCancelButton().Click += new EventHandler(btnCancel_Click);
        }
        protected void Page_PreRender(object sender, EventArgs e)
        {
            var currentOrganization = ServiceFactory.OrganizationService.Get(GetOrganizationId());
            organizationForm.GetNameTextBox().Text = currentOrganization.Name;
            PopulateOrganizationsDropDownList(currentOrganization);
        }

        private void PopulateOrganizationsDropDownList(TalentShow.Organization currentOrganization)
        {
            var organizationsDropDownList = organizationForm.GetOrganizationsDropDownList();

            organizationsDropDownList.Items.Add(new ListItem("-- Select an Organization --", ""));

            var organizations = ServiceFactory.OrganizationService.GetAll();

            foreach (var organization in organizations)
                organizationsDropDownList.Items.Add(new ListItem(organization.Name, Convert.ToString(organization.Id)));

            var selectedParentOrganizationId = "";
            
            if (currentOrganization.Parent != null)
                selectedParentOrganizationId = Convert.ToString(currentOrganization.Parent.Id);

            organizationsDropDownList.Items.FindByValue(selectedParentOrganizationId).Selected = true;
        }

        protected void btnUpdateOrganization_Click(object sender, EventArgs e)
        {
            if (!Page.IsValid)
            {
                //TODO
                return;
            }

            var name = organizationForm.GetNameTextBox().Text.Trim();
            var parentOrganizationId = organizationForm.GetOrganizationsDropDownList().SelectedValue;
            var organization = new TalentShow.Organization(GetOrganizationId(), name, null);

            if (!String.IsNullOrWhiteSpace(parentOrganizationId))
                organization.SetParent(ServiceFactory.OrganizationService.Get(Convert.ToInt32(parentOrganizationId)));

            ServiceFactory.OrganizationService.Update(organization);
            GoToOrganizationsPage();
        }

        protected void btnCancel_Click(object sender, EventArgs e)
        {
            GoToOrganizationsPage();
        }

        protected void btnDelete_Click(object sender, EventArgs e)
        {
            ServiceFactory.OrganizationService.Delete(GetOrganizationId());
            GoToOrganizationsPage();
        }

        private void GoToOrganizationsPage()
        {
            NavUtil.GoToOrganizationsPage(Response);
        }

        private int GetOrganizationId()
        {
            return Convert.ToInt32(Request.QueryString["organizationId"]);
        }
    }
}