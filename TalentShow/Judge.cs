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
        public string UserId { get; private set; }
        //public PersonName Name { get; private set; }
       // public Organization Affiliation { get; private set; }

        public Judge(int id, string userId)
        {
            Init(id, userId);
        }

        public Judge(string userId)
        {
            Init(0, userId);
        }

        public void SetId(int id)
        {
            Id = id;
        }

        private void Init(int id, string userId)
        {
            Id = id;
            UserId = userId;
        }
    }
}
