using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalentShow.CrossReferences;
using TalentShow.Repos;

namespace TalentShow.Services
{
    public class JudgeService
    {
        private readonly IRepo<Judge> JudgeRepo;
        private readonly ICrossReferenceRepo<ContestJudge> ContestJudgeRepo;

        public JudgeService(IRepo<Judge> judgeRepo, ICrossReferenceRepo<ContestJudge> contestJudgeRepo)
        {
            if (judgeRepo == null)
                throw new ApplicationException("A JudgeService cannot be constructed without a JudgeRepo.");
            if (contestJudgeRepo == null)
                throw new ApplicationException("A JudgeService cannot be constructed without an ContestJudgeRepo.");

            JudgeRepo = judgeRepo;
            ContestJudgeRepo = contestJudgeRepo;
        }

        public ICollection<Judge> GetContestJudges(int contestId)
        {
            /*
            var contestJudgeCollection = ContestJudgeRepo.GetMatchingOn(contestId);
            var judges = new List<Judge>();

            foreach (var cj in contestJudgeCollection)
            {
                if (JudgeRepo.Exists(cj.JudgeId))
                    judges.Add(JudgeRepo.Get(cj.JudgeId));
            }

            return judges;
            */
            return JudgeRepo.GetWhereParentForeignKeyIs(contestId);
        }

        public void AddContestJudge(int contestId, Judge judge)
        {
            Add(judge);
            ContestJudgeRepo.Add(new ContestJudge(contestId, judge.Id));
        }

        public ICollection<Judge> GetAll()
        {
            return JudgeRepo.GetAll();
        }

        public bool Exists(int id)
        {
            return JudgeRepo.Exists(id);
        }

        public Judge Get(int id)
        {
            return JudgeRepo.Get(id);
        }

        public void Add(Judge judge)
        {
            JudgeRepo.Add(judge);
        }

        public void Update(Judge judge)
        {
            JudgeRepo.Update(judge);
        }

        public void Delete(int id)
        {
            JudgeRepo.Delete(id);
        }

        public void Delete(Judge judge)
        {
            JudgeRepo.Delete(judge);
        }

        public void DeleteAll()
        {
            JudgeRepo.DeleteAll();
        }
    }
}
