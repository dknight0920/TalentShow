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

        public Contestant(int id, Performance performance, double ruleViolationPenalty)
        {
            Init(id, performance, ruleViolationPenalty);
        }

        public Contestant(Performance performance, double ruleViolationPenalty)
        {
            Init(0, performance, ruleViolationPenalty);
        }

        private void Init(int id, Performance performance, double ruleViolationPenalty)
        {
            Id = id;
            Performance = performance;
            RuleViolationPenalty = ruleViolationPenalty;
        }

        public void SetId(int id)
        {
            Id = id;
        }
    }
}
