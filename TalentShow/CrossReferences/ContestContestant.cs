using TalentShow.Repos;

namespace TalentShow.CrossReferences
{
    public class ContestContestant : IIdentity
    {
        public int Id { get; private set; }
        public int ContestId { get; private set; }
        public int ContestantId { get; private set; }

        public ContestContestant(int id, int contestId, int contestantId)
        {
            Init(id, contestId, contestantId);
        }

        public ContestContestant(int contestId, int contestantId)
        {
            Init(0, contestId, contestantId);
        }

        private void Init(int id, int contestId, int contestantId)
        {
            Id = id;
            ContestId = contestId;
            ContestantId = contestantId;
        }

        public void SetId(int id)
        {
            Id = id;
        }
    }
}
