using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.Repos;

namespace TalentShow
{
    public class PersonName : IIdentity
    {
        public int Id { get; private set; }
        public string FirstName { get; private set; }
        public string LastName { get; private set; }

        public PersonName(int id, string firstName, string lastName)
        {
            Init(id, firstName, lastName);
        }

        public PersonName(string firstName, string lastName)
        {
            Init(0, firstName, lastName);
        }

        public void SetId(int id)
        {
            Id = id;
        }

        private void Init(int id, string firstName, string lastName)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
        }

        public override string ToString()
        {
            return FirstName + " " + LastName;
        }
    }
}
