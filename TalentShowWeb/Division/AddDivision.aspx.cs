using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Division
{
    public partial class AddDivision : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            RedirectUtil.RedirectUnauthenticatedUserToLoginPage();
            RedirectUtil.RedirectNonAdminUserToHomePage();

            labelPageTitle.Text = "Add a Division";
            labelPageDescription.Text = "Use the form below to create a new division.";

            divisionForm.GetSubmitButton().Click += new EventHandler(btnAddDivision_Click);
            divisionForm.GetCancelButton().Click += new EventHandler(btnCancel_Click);
        }

        protected void btnAddDivision_Click(object sender, EventArgs e)
        {
            if (!Page.IsValid)
            {
                //TODO
                return;
            }

            var name = divisionForm.GetNameTextBox().Text.Trim();
            var division = new TalentShow.Division(0, name);
            ServiceFactory.DivisionService.Add(division);
            GoToDivisionsPage();
        }

        protected void btnCancel_Click(object sender, EventArgs e)
        {
            GoToDivisionsPage();
        }

        private void GoToDivisionsPage()
        {
            NavUtil.GoToDivisionsPage(Response);
        }
    }
}