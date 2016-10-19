using System.Runtime.Serialization;

namespace TalentShowWebApi.DataTransferObjects
{
    [DataContract]
    public class PerformerDto
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public DivisionDto Division { get; set; }
        [DataMember]
        public PersonNameDto Name { get; set; }
        [DataMember]
        public OrganizationDto Affiliation { get; set; }
    }
}