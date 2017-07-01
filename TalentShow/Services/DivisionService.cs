using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.Repos;

namespace TalentShow.Services
{
    public class DivisionService
    {
        private readonly IRepo<Division> DivisionRepo;

        public DivisionService(IRepo<Division> divisionRepo)
        {
            if (divisionRepo == null)
                throw new ApplicationException("A DivisionService cannot be constructed without a DivisionRepo.");

            DivisionRepo = divisionRepo;
        }

        public ICollection<Division> GetAll()
        {
            return DivisionRepo.GetAll();
        }

        public bool Exists(int id)
        {
            return DivisionRepo.Exists(id);
        }

        public Division Get(int id)
        {
            return DivisionRepo.Get(id);
        }

        public void Add(Division division)
        {
            DivisionRepo.Add(division);
        }

        public void Update(Division division)
        {
            DivisionRepo.Update(division);
        }

        public void Delete(int id)
        {
            DivisionRepo.Delete(id);
        }

        public void Delete(Division division)
        {
            DivisionRepo.Delete(division);
        }

        public void DeleteAll()
        {
            DivisionRepo.DeleteAll();
        }
    }
}