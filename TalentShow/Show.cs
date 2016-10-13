using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TalentShow
{
    public class Show
    {
        public string Name { get; private set;}
        public ICollection<Contest> Contests { get; private set; }

        public Show(string name)
        {
            Name = name;
            Contests = new List<Contest>();
        }
    }
}
