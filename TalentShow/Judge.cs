using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.Helpers;

namespace TalentShow
{
    public class Judge
    {
        public PersonName Name { get; private set; }
        public string Affiliation { get; private set; }

        public Judge(PersonName name, string affiliation)
        {
            Name = name;
            Affiliation = affiliation;
        }
    }
}
