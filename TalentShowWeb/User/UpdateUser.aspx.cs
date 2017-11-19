using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShowWeb.Account.Util;
using TalentShowWeb.Utils;

namespace TalentShowWeb.User
{
    public partial class UpdateUser : System.Web.UI.Page
    {
        private AccountUtil accountUtil;

        protected void Page_Load(object sender, EventArgs e)
        {
            RedirectUtil.RedirectUnauthenticatedUserToLoginPage();
            RedirectUtil.RedirectNonAdminUserToHomePage();

            this.accountUtil = new AccountUtil(Context);

            labelPageTitle.Text = "Update the User";
            labelPageDescription.Text = "Use the form below to update the user.";

            userForm.GetSubmitButton().Click += new EventHandler(btnUpdateUser_Click);
            userForm.GetCancelButton().Click += new EventHandler(btnCancel_Click);
        }

        protected void Page_PreRender(object sender, EventArgs e)
        {        
            var user = accountUtil.GetUser(GetUserId());
            userForm.GetUserNameLabel().Text = user.UserName;
            userForm.GetEmailTextBox().Text = user.Email;
            userForm.GetIsAdminCheckBox().Checked = accountUtil.IsUserAnAdmin(user.Id);
        }

        protected void btnUpdateUser_Click(object sender, EventArgs e)
        {
            if (!Page.IsValid)
            {
                //TODO
                return;
            }

            var userId = GetUserId();
            accountUtil.SetEmail(userId, userForm.GetEmailTextBox().Text.Trim());

            if (userForm.GetIsAdminCheckBox().Checked)
                accountUtil.AddToAdminRole(userId);
            else
                accountUtil.RemoveFromAdminRole(userId);

            GoToUsersPage();
        }

        protected void btnCancel_Click(object sender, EventArgs e)
        {
            GoToUsersPage();
        }

        protected void btnDelete_Click(object sender, EventArgs e)
        {
            accountUtil.DeleteUser(GetUserId());
            GoToUsersPage();
        }

        private void GoToUsersPage()
        {
            NavUtil.GoToUsersPage(Response);
        }

        private string GetUserId()
        {
            return Convert.ToString(Request.QueryString["userId"]);
        }
    }
}