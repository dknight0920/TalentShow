using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TalentShow
{
    public struct ScoreRange
    {
        public double Min { get; private set; }
        public double Max { get; private set; }

        public ScoreRange(double min, double max)
        {
            Min = min;
            Max = max;
        }
    }
}
