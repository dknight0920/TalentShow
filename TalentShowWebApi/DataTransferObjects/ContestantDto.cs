using System.Collections.Generic;
using System.Runtime.Serialization;

namespace TalentShowWebApi.DataTransferObjects
{
    [DataContract]
    public class ContestantDto
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public PerformanceDto Performance { get; set; }
        [DataMember]
        public ICollection<PerformerDto> Performers { get; set; }
        [DataMember]
        public double TotalScore { get; set; }
    }
}