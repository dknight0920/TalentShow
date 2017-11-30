using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace TalentShowWeb.Show.Contest
{
    public partial class ContestForm : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        public TextBox GetContestNameTextBox()
        {
            return txtContestName;
        }

        public TextBox GetDescriptionTextBox()
        {
            return txtDescription;
        }

        public TextBox GetMaxDurationTextBox()
        {
            return txtMaxDuration;
        }

        public DropDownList GetTimeKeepersDropDownList()
        {
            return dropDownListTimeKeepers;
        }

        public DropDownList GetStatusDropDownList()
        {
            return dropDownListStatus;
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