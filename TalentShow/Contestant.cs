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
        public double RuleViolationPenalty { get; private set; }
        public double TieBreakerPoints { get; private set; }

        public Contestant(int id, Performance performance, double ruleViolationPenalty, double tieBreakerPoints)
        {
            Init(id, performance, ruleViolationPenalty, tieBreakerPoints);
        }

        public Contestant(Performance performance, double ruleViolationPenalty, double tieBreakerPoints)
        {
            Init(0, performance, ruleViolationPenalty, tieBreakerPoints);
        }

        private void Init(int id, Performance performance, double ruleViolationPenalty, double tieBreakerPoints)
        {
            Id = id;
            Performance = performance;
            RuleViolationPenalty = ruleViolationPenalty;
            TieBreakerPoints = tieBreakerPoints;
        }

        public void SetId(int id)
        {
            Id = id;
        }
    }
}
