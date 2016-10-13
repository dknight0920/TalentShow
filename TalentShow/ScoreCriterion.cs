using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TalentShow
{
    public class ScoreCriterion
    {
        public string CriterionDescription { get; private set; }
        public ScoreRange ScoreRange { get; private set; }

        public ScoreCriterion(string criterionDescription, ScoreRange scoreRange)
        {
            CriterionDescription = criterionDescription;
            ScoreRange = scoreRange;
        }
    }
}
