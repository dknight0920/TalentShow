using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.Helpers;

namespace TalentShow
{
    public class Contest
    {
        public string Name { get; private set; }
        public ICollection<Contestant> Contestants { get; private set; }
        public ICollection<Judge> Judges { get; private set; }
        public ICollection<ScoreCriterion> ScoreCriteria { get; private set; }
        public ICollection<ScoreCard> ScoreCards { get; private set; }

        public Contest(string name)
        {
            Name = name;
            Contestants = new List<Contestant>();
            Judges = new List<Judge>();
            ScoreCriteria = new List<ScoreCriterion>();
            ScoreCards = new List<ScoreCard>();
        }

        public ScoreCard GetBlankScoreCard(Contestant contestant, Judge judge)
        {
            if (!Judges.Contains(judge))
                throw new ApplicationException("Only judges belonging to the contest can get a blank score card.");

            var scorableCriteria = new List<ScorableCriterion>();

            foreach (ScoreCriterion scoreCriterion in ScoreCriteria)
                scorableCriteria.Add(new ScorableCriterion(scoreCriterion));

            return new ScoreCard(contestant, judge, scorableCriteria);
        }
    }
}
