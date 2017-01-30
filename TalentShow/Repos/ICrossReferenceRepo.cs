using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TalentShow.Repos
{
    public interface ICrossReferenceRepo<T> : IRepo<T> 
    {
        ICollection<T> GetMatchingOn(int foreignKeyId);
    }
}
