using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace TalentShowWeb.User
{
    public partial class UserForm : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        public Label GetUserNameLabel()
        {
            return labelUserName;
        }

        public TextBox GetEmailTextBox()
        {
            return txtEmail;
        }

        public CheckBox GetIsAdminCheckBox()
        {
            return chkIsAdmin;
        }

        public CheckBox GetIsSuperuserCheckBox()
        {
            return chkIsSuperuser;
        }

        public Button GetSubmitButton()
        {
            return btnSubmit;
        }

        public Button GetCancelButton()
        {
            return btnCancel;
        }
    }
}