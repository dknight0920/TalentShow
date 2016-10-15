using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TalentShow.Repos
{
    public interface IIdentity
    {
        int Id { get; }
        void SetId(int id);
    }
}
