using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.Repos;

namespace TalentShow
{
    public class Division : IIdentity
    {
        public int Id { get; private set; }
        public string Name { get; private set; }

        public Division(int id, string name)
        {
            Init(id, name);
        }

        public Division(string name)
        {
            Init(0, name);
        }

        private void Init(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public void SetId(int id)
        {
            Id = id;
        }
    }
}
