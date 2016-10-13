using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.Helpers;

namespace TalentShow
{
    public class Contestant //A contestant is a collection of performers (1 to n) that give a performance in a contest and receive a score from judges that submit a score card to the contest
    {
        public Contest Contest { get; private set; }
        public ICollection<Performer> Performers { get; private set; }
        public Performance Performance { get; private set; }
        public double Score
        {
            get
            {
                return Contest.ScoreCards.Where(s => s.Contestant == this).Average(s => s.AverageScore);
            }
        }

        public Contestant(Contest contest, ICollection<Performer> performers, Performance performance)
        {
            Init(contest, performers, performance);
        }

        public Contestant(Contest contest, Performer performer, Performance performance)
        {
            Init(contest, new List<Performer>() { performer }, performance);
        }

        private void Init(Contest contest, ICollection<Performer> performers, Performance performance)
        {
            if (performers.IsNullOrEmpty())
                throw new ApplicationException("At least one performer is required to construct a contestant.");

            Contest = contest;
            Performers = performers;
            Performance = performance;
        }
    }
}
