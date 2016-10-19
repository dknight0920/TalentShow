using System.Runtime.Serialization;

namespace TalentShowWebApi.DataTransferObjects
{
    [DataContract]
    public class ScoreCriterionDto
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string CriterionDescription { get; set; }
        [DataMember]
        public ScoreRangeDto ScoreRange { get; set; }
    }
}