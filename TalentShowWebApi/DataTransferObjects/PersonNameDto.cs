using System.Runtime.Serialization;

namespace TalentShowWebApi.DataTransferObjects
{
    [DataContract]
    public class PersonNameDto
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string FirstName { get; set; }
        [DataMember]
        public string LastName { get; set; }
    }
}