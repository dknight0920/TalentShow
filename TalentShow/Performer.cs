using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.Repos;

namespace TalentShow
{
    public class Performer : IIdentity
    {
        public int Id { get; private set; }
        public Division Division { get; private set; }
        public PersonName Name { get; private set; }
        public Organization Affiliation { get; private set; }

        public Performer(int id, Division division, PersonName name, Organization affiliation)
        {
            Init(id, division, name, affiliation);
        }

        public Performer(Division division, PersonName name, Organization affiliation)
        {
            Init(0, division, name, affiliation);
        }

        private void Init(int id, Division division, PersonName name, Organization affiliation)
        {
            if (division == null)
                throw new ApplicationException("A performer cannot be constructed without a division.");
            if (name == null)
                throw new ApplicationException("A performer cannot be constructed without a name.");

            Id = id;
            Division = division;
            Name = name;
            Affiliation = affiliation;
        }

        public void SetId(int id)
        {
            Id = id;
        }
    }
}
