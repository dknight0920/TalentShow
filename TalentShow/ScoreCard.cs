using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.Helpers;
using TalentShow.Repos;

namespace TalentShow
{
    public class ScoreCard : IIdentity
    {
        public int Id { get; private set; }
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
        public double TotalScore
        {
            get
            {
                return ScorableCriteria.Sum(s => s.Score);
            }
        }

        public ScoreCard(int id, Contestant contestant, Judge judge, ICollection<ScorableCriterion> scorableCriteria)
        {
            Init(id, contestant, judge, scorableCriteria);
        }

        public ScoreCard(Contestant contestant, Judge judge, ICollection<ScorableCriterion> scorableCriteria)
        {
            Init(0, contestant, judge, scorableCriteria);
        }

        private void Init(int id, Contestant contestant, Judge judge, ICollection<ScorableCriterion> scorableCriteria)
        {
            ValidateConstructorArgs(id, contestant, judge, scorableCriteria);

            Id = id;
            Contestant = contestant;
            Judge = judge;
            ScorableCriteria = scorableCriteria;
        }

        private static void ValidateConstructorArgs(int id, Contestant contestant, Judge judge, ICollection<ScorableCriterion> scorableCriteria)
        {
            if (contestant == null)
                throw new ApplicationException("A score card cannot be created without a contestant. Score Card Id: " + id);
            if (judge == null)
                throw new ApplicationException("A score card cannot be created without a judge. Score Card Id: " + id);
            if (scorableCriteria.IsNullOrEmpty())
                throw new ApplicationException("A score card cannot be created without scorable score criteria. Score Card Id: " + id);
        }

        public void SetId(int id)
        {
            Id = id;
        }
    }
}
