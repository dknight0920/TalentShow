using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace TalentShowWeb.Organization
{
    public partial class OrganizationForm : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        public TextBox GetNameTextBox()
        {
            return txtName;
        }

        public DropDownList GetOrganizationsDropDownList()
        {
            return dropDownListOrganizations;
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