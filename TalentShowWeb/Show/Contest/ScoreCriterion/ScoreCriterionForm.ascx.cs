using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace TalentShowWeb.Show.Contest.ScoreCriterion
{
    public partial class ScoreCriterionForm : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        public TextBox GetDescriptionTextBox()
        {
            return txtDescription;
        }

        public TextBox GetMinScoreTextBox()
        {
            return txtMinScore;
        }

        public TextBox GetMaxScoreTextBox()
        {
            return txtMaxScore;
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