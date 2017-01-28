using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.Repos;

namespace TalentShow
{
    public class Show : IIdentity
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public string Description { get; private set; }
        public ICollection<Contest> Contests { get; private set; }

        public Show(int id, string name, string description)
        {
            Init(id, name, description);
        }

        public Show(int id, string name)
        {
            Init(id, name);
        }

        public Show(string name)
        {
            Init(0, name);
        }

        private void Init(int id, string name, string description = null)
        {
            if (String.IsNullOrWhiteSpace(name))
                throw new ApplicationException("A show cannot be constructed without a name.");

            Id = id;
            Name = name;
            Description = description;
            Contests = new List<Contest>();
        }

        public void SetId(int id)
        {
            Id = id;
        }
    }
}
