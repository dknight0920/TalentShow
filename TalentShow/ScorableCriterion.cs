using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.Repos;

namespace TalentShow
{
    public class ScorableCriterion : IIdentity
    {
        public int Id { get; private set; }
        public ScoreCriterion ScoreCriterion { get; private set; }
        public double Score { get; private set; }
        public string Comment { get; private set; }

        public ScorableCriterion(int id, ScoreCriterion scoreCriterion)
        {
            Init(id, scoreCriterion);
        }

        public ScorableCriterion(ScoreCriterion scoreCriterion)
        {
            Init(0, scoreCriterion);
        }

        private void Init(int id, ScoreCriterion scoreCriterion)
        {
            if (scoreCriterion == null)
                throw new ApplicationException("Scorable score criterion cannot be create without score criterion.");

            Id = id;
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

        public void SetId(int id)
        {
            Id = id;
        }
    }
}
