using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace TalentShowWebApi.DataTransferObjects
{
    [DataContract]
    public class ShowDto
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public ICollection<ContestDto> Contests { get; set; }
    }
}