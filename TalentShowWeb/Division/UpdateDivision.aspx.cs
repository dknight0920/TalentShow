using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShowWeb.Models;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Division
{
    public partial class UpdateDivision : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            RedirectUtil.RedirectUnauthenticatedUserToLoginPage();
            RedirectUtil.RedirectNonAdminUserToHomePage();

            BreadCrumbUtil.DataBind(Page, new List<BreadCrumb>()
            {
                new BreadCrumb(NavUtil.GetHomePageUrl(), "Home"),
                new BreadCrumb(NavUtil.GetDivisionsPageUrl(), "Divisions"),
                new BreadCrumb(NavUtil.GetUpdateDivisionPageUrl(GetDivisionId()), "Update Division", IsActive: true),
            });

            labelPageTitle.Text = "Update the Division";
            labelPageDescription.Text = "Use the form below to update the division.";

            divisionForm.GetSubmitButton().Click += new EventHandler(btnUpdateDivision_Click);
            divisionForm.GetCancelButton().Click += new EventHandler(btnCancel_Click);
        }

        protected void Page_PreRender(object sender, EventArgs e)
        {
            var division = ServiceFactory.DivisionService.Get(GetDivisionId());
            divisionForm.GetNameTextBox().Text = division.Name;
        }

        protected void btnUpdateDivision_Click(object sender, EventArgs e)
        {
            if (!Page.IsValid)
            {
                //TODO
                return;
            }

            var name = divisionForm.GetNameTextBox().Text.Trim();
            var division = new TalentShow.Division(GetDivisionId(), name);
            ServiceFactory.DivisionService.Update(division);
            GoToDivisionsPage();
        }

        protected void btnCancel_Click(object sender, EventArgs e)
        {
            GoToDivisionsPage();
        }

        protected void btnDelete_Click(object sender, EventArgs e)
        {
            ServiceFactory.DivisionService.Delete(GetDivisionId());
            GoToDivisionsPage();
        }

        private void GoToDivisionsPage()
        {
            NavUtil.GoToDivisionsPage(Response);
        }

        private int GetDivisionId()
        {
            return Convert.ToInt32(Request.QueryString["divisionId"]);
        }
    }
}