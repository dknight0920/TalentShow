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
    public partial class UpdateJudge : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            labelPageTitle.Text = "Update the Judge";
            labelPageDescription.Text = "Use the form below to update the judge.";

            judgeForm.GetSubmitButton().Click += new EventHandler(btnUpdateJudge_Click);
            judgeForm.GetCancelButton().Click += new EventHandler(btnCancel_Click);
        }

        protected void Page_PreRender(object sender, EventArgs e)
        {
            var usersDropDownList = judgeForm.GetUsersDropDownList();

            usersDropDownList.Items.Add(new ListItem("-- Select a User ID --", ""));

            var accountUtil = new AccountUtil(Context);
            var users = accountUtil.GetAllUsers();

            var contest = ServiceFactory.ContestService.Get(GetContestId());
            var judge = ServiceFactory.JudgeService.Get(GetJudgeId());

            foreach (var user in users)
            {
                if(user.Id == judge.UserId || !contest.Judges.Any(j => j.UserId == user.Id))
                    usersDropDownList.Items.Add(new ListItem(user.Email, user.Id));
            }

            usersDropDownList.Items.FindByValue(judge.UserId).Selected = true;
        }

        protected void btnUpdateJudge_Click(object sender, EventArgs e)
        {
            if (!Page.IsValid)
            {
                //TODO
                return;
            }

            var userId = judgeForm.GetUsersDropDownList().SelectedValue;
            var judge = new TalentShow.Judge(GetJudgeId(), userId);
            ServiceFactory.JudgeService.Update(judge);
            GoToContestPage();
        }

        protected void btnCancel_Click(object sender, EventArgs e)
        {
            GoToContestPage();
        }

        protected void btnDelete_Click(object sender, EventArgs e)
        {
            ServiceFactory.JudgeService.Delete(GetJudgeId());
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

        private int GetJudgeId()
        {
            return Convert.ToInt32(Request.QueryString["judgeId"]);
        }
    }
}