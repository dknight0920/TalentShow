using TalentShow.Repos;

namespace TalentShow.CrossReferences
{
    public class ContestScoreCriterion : IIdentity
    {
        public int Id { get; private set; }
        public int ContestId { get; private set; }
        public int ScoreCriterionId { get; private set; }

        public ContestScoreCriterion(int id, int contestId, int scoreCriterionId)
        {
            Init(id, contestId, scoreCriterionId);
        }

        public ContestScoreCriterion(int contestId, int scoreCriterionId)
        {
            Init(0, contestId, scoreCriterionId);
        }

        private void Init(int id, int contestId, int scoreCriterionId)
        {
            Id = id;
            ContestId = contestId;
            ScoreCriterionId = scoreCriterionId;
        }

        public void SetId(int id)
        {
            Id = id;
        }
    }
}
