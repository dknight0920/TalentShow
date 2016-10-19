using System.Runtime.Serialization;

namespace TalentShowWebApi.DataTransferObjects
{
    [DataContract]
    public class ScorableCriterionDto
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public ScoreCriterionDto ScoreCriterion { get; set; }
        [DataMember]
        public double Score { get; set; }
        [DataMember]
        public string Comment { get; set; }
    }
}