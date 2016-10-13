using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.Helpers;

namespace TalentShow
{
    public class ScoreCard
    {
        public Contestant Contestant { get; private set; }
        public Judge Judge { get; private set; }
        public ICollection<ScorableCriterion> ScorableCriteria { get; private set; }
        public double AverageScore
        {
            get
            {
                return ScorableCriteria.Average(s => s.Score);
            }
        }

        public ScoreCard(Contestant contestant, Judge judge, ICollection<ScorableCriterion> scorableCriteria)
        {
            ValidateConstructorArgs(contestant, judge, scorableCriteria);

            Contestant = contestant;
            Judge = judge;
            ScorableCriteria = scorableCriteria;
        }

        private static void ValidateConstructorArgs(Contestant contestant, Judge judge, ICollection<ScorableCriterion> scorableCriteria)
        {
            if (contestant == null)
                throw new ApplicationException("A score card cannot be created without a contestant.");
            if (judge == null)
                throw new ApplicationException("A score card cannot be created without a judge.");
            if (scorableCriteria.IsNullOrEmpty())
                throw new ApplicationException("A score card cannot be created without scorable score criteria.");
        }
    }
}
