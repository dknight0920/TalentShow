using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShowWeb.Account.Util;
using TalentShowWeb.Models;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Show.Utils
{
    public static class ContestantNameUtil
    {
        public static string GetContestantName(int contestantId)
        {
            var performers = ServiceFactory.PerformerService.GetContestantPerformers(contestantId);
            return GetContestantName(performers);
        }

        public static string GetContestantName(ICollection<TalentShow.Performer> performers)
        {
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