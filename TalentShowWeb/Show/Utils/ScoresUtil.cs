using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TalentShowWeb.Show.Utils
{
    public static class ScoresUtil
    {
        public static string GetScores(ICollection<TalentShow.ScoreCard> scoreCards)
        {
            bool isFirst = true;

            string text = "";

            foreach (var scoreCard in scoreCards)
            {
                text += (!isFirst ? ", " : "") + scoreCard.TotalScore;
                isFirst = false;
            }

            return text;
        }
    }
}