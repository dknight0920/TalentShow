using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.Helpers;
using TalentShow.Repos;

namespace TalentShow
{
    public class Contestant : IIdentity //A contestant is a collection of performers (1 to n) that give a performance in a contest and receive a score from judges that submit a score card to the contest
    {
        public int Id { get; private set; }
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


        public Contestant(int id, Contest contest, ICollection<Performer> performers, Performance performance)
        {
            Init(id, contest, performers, performance);
        }

        public Contestant(Contest contest, ICollection<Performer> performers, Performance performance)
        {
            Init(0, contest, performers, performance);
        }

        public Contestant(Contest contest, Performer performer, Performance performance)
        {
            Init(0, contest, new List<Performer>() { performer }, performance);
        }

        private void Init(int id, Contest contest, ICollection<Performer> performers, Performance performance)
        {
            if (contest == null)
                throw new ApplicationException("A contestant cannot be constructed without a contest.");
            if (performers.IsNullOrEmpty())
                throw new ApplicationException("A contestant cannot be constructed without any performers.");

            Id = id;
            Contest = contest;
            Performers = performers;
            Performance = performance;
        }

        public void SetId(int id)
        {
            Id = id;
        }
    }
}
