using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace TalentShowWeb.Show.Contest.Contestant.Performer
{
    public partial class PerformerForm : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        public TextBox GetFirstNameTextBox()
        {
            return txtFirstName;
        }

        public TextBox GetLastNameTextBox()
        {
            return txtLastName;
        }

        public DropDownList GetOrganizationsDropDownList()
        {
            return dropDownListOrganizations;
        }

        public DropDownList GetDivisionsDropDownList()
        {
            return dropDownListDivisions;
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