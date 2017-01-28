using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.Repos;

namespace TalentShow.Services
{
    public class ShowService
    {
        private readonly IRepo<Show> ShowRepo;

        public ShowService(IRepo<Show> showRepo)
        {
            if (showRepo == null)
                throw new ApplicationException("A ShowService cannot be constructed without a ShowRepo.");

            ShowRepo = showRepo;
        }

        public ICollection<Show> GetAll()
        {
            return ShowRepo.GetAll();
        }

        public Show Get(int id)
        {
            return ShowRepo.Get(id);
        }

        public void Add(Show show)
        {
            ShowRepo.Add(show);
        }

        public void Update(Show show)
        {
            ShowRepo.Update(show);
        }

        public void Delete(int id)
        {
            ShowRepo.Delete(id);
        }

        public void Delete(Show show)
        {
            ShowRepo.Delete(show);
        }

        public void DeleteAll()
        {
            ShowRepo.DeleteAll();
        }
    }
}
