using TalentShow.Repos;

namespace TalentShow.CrossReferences
{
    public class ContestantPerformer : IIdentity
    {
        public int Id { get; private set; }
        public int ContestantId { get; private set; }
        public int PerformerId { get; private set; }

        public ContestantPerformer(int id, int contestantId, int performerId)
        {
            Init(id, contestantId, performerId);
        }

        public ContestantPerformer(int contestantId, int performerId)
        {
            Init(0, contestantId, performerId);
        }

        private void Init(int id, int contestantId, int performerId)
        {
            Id = id;
            ContestantId = contestantId;
            PerformerId = performerId;
        }

        public void SetId(int id)
        {
            Id = id;
        }
    }
}
