using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TalentShowWebApi.DataTransferObjects
{
    public class ContestDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<ContestantDto> Contestants { get; set; }
        public ICollection<JudgeDto> Judges { get; set; }
        public ICollection<ScoreCriterionDto> ScoreCriteria { get; set; }
        public ICollection<ScoreCardDto> ScoreCards { get; set; }
    }
}