using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShowWeb.Account.Util;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Show.Contest.Judge
{
    public partial class AddJudge : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            RedirectUtil.RedirectUnauthenticatedUserToLoginPage();
            RedirectUtil.RedirectNonAdminUserToHomePage();

            labelPageTitle.Text = "Add a Judge";
            labelPageDescription.Text = "Use the form below to create a new judge.";

            judgeForm.GetSubmitButton().Click += new EventHandler(btnAddJudge_Click);
            judgeForm.GetCancelButton().Click += new EventHandler(btnCancel_Click);
        }

        protected void Page_PreRender(object sender, EventArgs e)
        {
            var usersDropDownList = judgeForm.GetUsersDropDownList();

            usersDropDownList.Items.Add(new ListItem("-- Select a User ID --", ""));

            var accountUtil = new AccountUtil(Context);
            var users = accountUtil.GetAllUsers();

            var contest = ServiceFactory.ContestService.Get(GetContestId());

            foreach (var user in users.Where(u => !contest.Judges.Any(j => j.UserId == u.Id)))
                usersDropDownList.Items.Add(new ListItem(user.UserName, user.Id));

            usersDropDownList.Items.FindByValue("").Selected = true;
        }

        protected void btnAddJudge_Click(object sender, EventArgs e)
        {
            if (!Page.IsValid)
            {
                //TODO
                return;
            }

            var userId = judgeForm.GetUsersDropDownList().SelectedValue;
            var judge = new TalentShow.Judge(0, userId);
            ServiceFactory.JudgeService.AddContestJudge(GetContestId(), judge);
            GoToContestPage();
        }

        protected void btnCancel_Click(object sender, EventArgs e)
        {
            GoToContestPage();
        }

        private void GoToContestPage()
        {
            NavUtil.GoToContestPage(Response, GetShowId(), GetContestId());
        }

        private int GetShowId()
        {
            return Convert.ToInt32(Request.QueryString["showId"]);
        }

        private int GetContestId()
        {
            return Convert.ToInt32(Request.QueryString["contestId"]);
        }
    }
}