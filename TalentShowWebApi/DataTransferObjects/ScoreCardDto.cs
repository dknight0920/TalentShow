using System.Collections.Generic;
using System.Runtime.Serialization;

namespace TalentShowWebApi.DataTransferObjects
{
    [DataContract]
    public class ScoreCardDto
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public ContestantDto Contestant { get; set; }
        [DataMember]
        public JudgeDto Judge { get; set; }
        [DataMember]
        public ICollection<ScorableCriterionDto> ScorableCriteria { get; set; }
        [DataMember]
        public double AverageScore { get; set; }
        [DataMember]
        public double TotalScore { get; set; }
    }
}