using System.Runtime.Serialization;

namespace TalentShowWebApi.DataTransferObjects
{
    [DataContract]
    public class OrganizationDto
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public OrganizationDto Parent { get; set; }
    }
}