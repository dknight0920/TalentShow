using System.Collections.Generic;

namespace TalentShow.Repos
{
    public interface IRepo<T>
    {
        ICollection<T> GetAll();
        T Get(int id);
        void Add(T judge);
        void Delete(int id);
        void Delete(T judge);
        void DeleteAll();
    }
}
