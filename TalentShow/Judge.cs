using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.Helpers;
using TalentShow.Repos;

namespace TalentShow
{
    public class Judge
    {
        public int Id { get; private set; }
        public PersonName Name { get; private set; }
        public string Affiliation { get; private set; }

        public Judge(int id, PersonName name, string affiliation)
        {
            Init(id, name, affiliation);
        }

        public Judge(PersonName name, string affiliation)
        {
            Init(0, name, affiliation);
        }

        private void Init(int id, PersonName name, string affiliation)
        {
            Id = id;
            Name = name;
            Affiliation = affiliation;
        }
    }
}
