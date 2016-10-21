using TalentShow.Repos;

namespace TalentShowDataStorage.CrossReferences
{
    internal class ContestScoreCard : IIdentity
    {
        public int Id { get; private set; }
        public int ContestId { get; private set; }
        public int ScoreCardId { get; private set; }

        public ContestScoreCard(int id, int contestId, int scoreCardId)
        {
            Init(id, contestId, scoreCardId);
        }

        public ContestScoreCard(int contestId, int scoreCardId)
        {
            Init(0, contestId, scoreCardId);
        }

        private void Init(int id, int contestId, int scoreCardId)
        {
            Id = id;
            ContestId = contestId;
            ScoreCardId = scoreCardId;
        }

        public void SetId(int id)
        {
            Id = id;
        }
    }
}
