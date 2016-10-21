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
        public ICollection<Performer> Performers { get; private set; }
        public Performance Performance { get; private set; }
        public double Score
        {
            get
            {
                //var scoreCards = ScoreCards.Where(s => s.Contestant == this);

                //if(scoreCards.Any())
                //    return Contest.ScoreCards.Where(s => s.Contestant == this).Average(s => s.TotalScore);
                return 0;
            }
        }


        public Contestant(int id, ICollection<Performer> performers, Performance performance)
        {
            Init(id, performers, performance);
        }

        public Contestant(ICollection<Performer> performers, Performance performance)
        {
            Init(0, performers, performance);
        }

        public Contestant(Performer performer, Performance performance)
        {
            Init(0, new List<Performer>() { performer }, performance);
        }

        private void Init(int id, ICollection<Performer> performers, Performance performance)
        {
            if (performers.IsNullOrEmpty())
                throw new ApplicationException("A contestant cannot be constructed without any performers.");

            Id = id;
            Performers = performers;
            Performance = performance;
        }

        public void SetId(int id)
        {
            Id = id;
        }
    }
}
