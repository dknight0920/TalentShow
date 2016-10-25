using TalentShow.Repos;

namespace TalentShowDataStorage.CrossReferences
{
    internal class ShowContest : IIdentity
    {
        public int Id { get; private set; }
        public int ShowId { get; private set; }
        public int ContestId { get; private set; }

        public ShowContest(int id, int showId, int contestId)
        {
            Init(id, showId, contestId);
        }

        public ShowContest(int showId, int contestId)
        {
            Init(0, showId, contestId);
        }

        private void Init(int id, int showId, int contestId)
        {
            Id = id;
            ShowId = showId;
            ContestId = contestId;
        }

        public void SetId(int id)
        {
            Id = id;
        }
    }
}

