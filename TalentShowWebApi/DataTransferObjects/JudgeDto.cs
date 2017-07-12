using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace TalentShowWebApi.DataTransferObjects
{
    [DataContract]
    public class JudgeDto
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string UserId { get; set; }
    }
}