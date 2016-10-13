using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TalentShow
{
    public class ScorableCriterion
    {
        public ScoreCriterion ScoreCriterion { get; private set; }
        public double Score { get; private set; }
        public string Comment { get; private set; }

        public ScorableCriterion(ScoreCriterion scoreCriterion)
        {
            if (scoreCriterion == null)
                throw new ApplicationException("Scorable score criterion cannot be create without score criterion.");

            ScoreCriterion = scoreCriterion;
            Score = scoreCriterion.ScoreRange.Min;
            Comment = "";
        }

        public void SetScoreAndComment(double score, string comment)
        {
            if (score > ScoreCriterion.ScoreRange.Max || score < ScoreCriterion.ScoreRange.Min)
                throw new ApplicationException("The score cannot be less than " + ScoreCriterion.ScoreRange.Min + " or greater than " + ScoreCriterion.ScoreRange.Max);

            Score = score;
            Comment = comment;
        }
    }
}
