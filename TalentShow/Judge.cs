using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.Helpers;
using TalentShow.Repos;

namespace TalentShow
{
    public class Judge : IIdentity
    {
        public int Id { get; private set; }
        public PersonName Name { get; private set; }
        public Organization Affiliation { get; private set; }

        public Judge(int id, PersonName name, Organization affiliation)
        {
            Init(id, name, affiliation);
        }

        public Judge(PersonName name, Organization affiliation)
        {
            Init(0, name, affiliation);
        }

        public void SetId(int id)
        {
            Id = id;
        }

        private void Init(int id, PersonName name, Organization affiliation)
        {
            Id = id;
            Name = name;
            Affiliation = affiliation;
        }
    }
}
