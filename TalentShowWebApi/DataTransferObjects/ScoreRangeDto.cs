using System.Runtime.Serialization;

namespace TalentShowWebApi.DataTransferObjects
{
    [DataContract]
    public class ScoreRangeDto
    {
        [DataMember]
        public double Min { get; set; }
        [DataMember]
        public double Max { get; set; }
    }
}