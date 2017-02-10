using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.Repos;

namespace TalentShow
{
    public class ScoreCriterion : IIdentity
    {
        public int Id { get; private set; }
        public string CriterionDescription { get; private set; }
        public ScoreRange ScoreRange { get; private set; }

        public ScoreCriterion(int id, string criterionDescription, ScoreRange scoreRange)
        {
            Init(id, criterionDescription, scoreRange);
        }

        public ScoreCriterion(string criterionDescription, ScoreRange scoreRange)
        {
            Init(0, criterionDescription, scoreRange);
        }

        private void Init(int id, string criterionDescription, ScoreRange scoreRange)
        {
            if (String.IsNullOrWhiteSpace(criterionDescription))
                throw new ApplicationException("A score criterion cannot be constructed without a criterion description.");

            Id = id;
            CriterionDescription = criterionDescription;
            ScoreRange = scoreRange;
        }

        public void SetId(int id)
        {
            Id = id;
        }
    }
}
