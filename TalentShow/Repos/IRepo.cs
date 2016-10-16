using System.Collections.Generic;

namespace TalentShow.Repos
{
    public interface IRepo<T>
    {
        ICollection<T> GetAll();
        T Get(int id);
        bool Exists(int id);
        void Add(T item);
        void Update(T item);
        void Delete(int id);
        void Delete(T item);
        void DeleteAll();
    }
}
