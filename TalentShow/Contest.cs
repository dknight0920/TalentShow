using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.Helpers;
using TalentShow.Repos;

namespace TalentShow
{
    public class Contest : IIdentity
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public string Description { get; private set; }
        public ICollection<Contestant> Contestants { get; private set; }
        public ICollection<Judge> Judges { get; private set; }
        public ICollection<ScoreCriterion> ScoreCriteria { get; private set; }
        public ICollection<ScoreCard> ScoreCards { get; private set; }
        public string TimeKeeperId { get; set; }

        public Contest(int id, string name, string description, string timeKeeperId)
        {
            Init(id, name, timeKeeperId, description);
        }

        public Contest(int id, string name, string timeKeeperId)
        {
            Init(id, name, timeKeeperId);
        }

        public Contest(string name, string timeKeeperId)
        {
            Init(0, name, timeKeeperId);
        }

        private void Init(int id, string name, string timeKeeperId, string description = null)
        {
            if (String.IsNullOrWhiteSpace(name))
                throw new ApplicationException("A contest cannot be constructed without a name.");

            Id = id;
            Name = name;
            TimeKeeperId = timeKeeperId;
            Description = description;
            Contestants = new List<Contestant>();
            Judges = new List<Judge>();
            ScoreCriteria = new List<ScoreCriterion>();
            ScoreCards = new List<ScoreCard>();
        }

        public ScoreCard GetBlankScoreCard(Contestant contestant, Judge judge)
        {
            if (!Judges.Any(j => j.Id == judge.Id))
                throw new ApplicationException("Only judges belonging to the contest can get a blank score card.");

            var scorableCriteria = new List<ScorableCriterion>();

            foreach (ScoreCriterion scoreCriterion in ScoreCriteria)
                scorableCriteria.Add(new ScorableCriterion(scoreCriterion));

            return new ScoreCard(contestant, judge, scorableCriteria);
        }

        public void SetId(int id)
        {
            Id = id;
        }
    }
}
