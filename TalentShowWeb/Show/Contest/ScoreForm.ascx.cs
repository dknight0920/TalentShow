using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShow;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Show.Contest
{
    public partial class ScoreForm : System.Web.UI.UserControl
    {
        private TalentShow.Contest contest;

        protected void Page_Load(object sender, EventArgs e)
        {
            contest = ServiceFactory.ContestService.Get(GetContestId());
        }

        protected TalentShow.Contest GetContest()
        {
            return contest;
        }

        private int GetContestId()
        {
            return Convert.ToInt32(Request.QueryString["contestId"]);
        }

        protected string GetContestantHeadingText(TalentShow.Contestant contestant)
        {
            var performers = ServiceFactory.PerformerService.GetContestantPerformers(contestant.Id);

            if (!performers.Any())
                return "Contestant ID: " + contestant.Id;

            bool isFirst = true;
            string text = "";

            foreach (var performer in performers)
            {
                text += (!isFirst ? ", " : "") + performer.Name.FirstName + " " + performer.Name.LastName;
                isFirst = false;
            }

            return text;
        }
    }
}