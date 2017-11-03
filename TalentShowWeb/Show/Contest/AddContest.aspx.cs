using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Show.Contest
{
    public partial class AddContest : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            labelPageTitle.Text = "Add a Contest";
            labelPageDescription.Text = "Use the form below to create a new contest.";

            contestForm.GetSubmitButton().Click += new EventHandler(btnAddContest_Click);
            contestForm.GetCancelButton().Click += new EventHandler(btnCancel_Click);
        }

        protected void Page_PreRender(object sender, EventArgs e)
        {
            var manager = Context.GetOwinContext().GetUserManager<ApplicationUserManager>();
            var timeKeepersDropDownList = contestForm.GetTimeKeepersDropDownList();

            foreach (var user in manager.Users)
                timeKeepersDropDownList.Items.Add(new ListItem(user.Email, user.Id));
        }

        protected void btnAddContest_Click(object sender, EventArgs e)
        {
            if (!Page.IsValid)
            {
                //TODO
                return;
            }

            var contestName = contestForm.GetContestNameTextBox().Text.Trim();
            var description = contestForm.GetDescriptionTextBox().Text.Trim();
            var timeKeeper = contestForm.GetTimeKeepersDropDownList().SelectedValue.Trim();
            var contest = new TalentShow.Contest(0, contestName, description, timeKeeper);
            ServiceFactory.ContestService.AddShowContest(GetShowId(), contest);
            GoToShowPage();
        }

        protected void btnCancel_Click(object sender, EventArgs e)
        {
            GoToShowPage();
        }

        private void GoToShowPage()
        {
            NavUtil.GoToShowPage(Response, GetShowId());
        }

        private int GetShowId()
        {
            return Convert.ToInt32(Request.QueryString["showId"]);
        }
    }
}