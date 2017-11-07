using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace TalentShowWeb.Show.Contest.Judge
{
    public partial class JudgeForm : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        public DropDownList GetUsersDropDownList()
        {
            return dropDownListUsers;
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