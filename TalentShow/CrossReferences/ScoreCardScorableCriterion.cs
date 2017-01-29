using TalentShow.Repos;

namespace TalentShow.CrossReferences
{
    public class ScoreCardScorableCriterion : IIdentity
    {
        public int Id { get; private set; }
        public int ScoreCardId { get; private set; }
        public int ScorableCriterionId { get; private set; }

        public ScoreCardScorableCriterion(int id, int scoreCardId, int scorableCriterionId)
        {
            Init(id, scoreCardId, scorableCriterionId);
        }

        public ScoreCardScorableCriterion(int scoreCardId, int scorableCriterionId)
        {
            Init(0, scoreCardId, scorableCriterionId);
        }

        private void Init(int id, int scoreCardId, int scorableCriterionId)
        {
            Id = id;
            ScoreCardId = scoreCardId;
            ScorableCriterionId = scorableCriterionId;
        }

        public void SetId(int id)
        {
            Id = id;
        }
    }
}
