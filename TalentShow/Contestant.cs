using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.Helpers;
using TalentShow.Repos;

namespace TalentShow
{
    public class Contestant : IIdentity
    {
        public int Id { get; private set; }
        public Performance Performance { get; private set; }
        
        public Contestant(int id, Performance performance)
        {
            Init(id, performance);
        }

        public Contestant(Performance performance)
        {
            Init(0, performance);
        }

        private void Init(int id, Performance performance)
        {
            Id = id;
            Performance = performance;
        }

        public void SetId(int id)
        {
            Id = id;
        }
    }
}
