using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.Repos;

namespace TalentShow
{
    public class Organization : IIdentity
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public Organization Parent { get; private set; }

        public Organization(int id, string name, Organization parent)
        {
            Init(id, name, parent);
        }

        public Organization(string name, Organization parent)
        {
            Init(0, name, parent);
        }

        public Organization(string name)
        {
            Init(0, name, null);
        }

        private void Init(int id, string name, Organization parent)
        {
            if (String.IsNullOrWhiteSpace(name))
                throw new ApplicationException("An organization cannot be constructed without a name.");

            Id = id;
            Name = name;
            Parent = parent;
        }

        public void SetId(int id)
        {
            Id = id;
        }

        public void SetParent(Organization parent)
        {
            Parent = parent;
        }

        public bool HasParent()
        {
            return Parent != null;
        }
    }
}
