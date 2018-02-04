using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TalentShow;
using TalentShow.Services;
using TalentShowDataStorage;

namespace TalentShowWebApi.DataTransferObjects.Helpers
{
    public static class DtoConverter
    {
        public static Show ConvertFromDto(this ShowDto showDto)
        {
            var show = new Show(showDto.Id, showDto.Name, showDto.Description);

            //foreach (var contestDto in showDto.Contests)
                //show.Contests.Add(ConvertFromDto(contestDto));

            return show;
        }

        public static Contestant ConvertFromDto(this ContestantDto contestantDto)
        {
            return new Contestant(contestantDto.Id, ConvertFromDto(contestantDto.Performance), ruleViolationPenalty: 0, tieBreakerPoints: 0);
        }

        public static ICollection<Performer> ConvertFromDto(this ICollection<PerformerDto> performersDto)
        {
            var performers = new List<Performer>();

            foreach (var performerDto in performersDto)
                performers.Add(ConvertFromDto(performerDto));

            return performers;
        }

        public static Performer ConvertFromDto(this PerformerDto performerDto)
        {
            return new Performer(performerDto.Id, ConvertFromDto(performerDto.Division), ConvertFromDto(performerDto.Name), ConvertFromDto(performerDto.Affiliation));
        }

        public static Performance ConvertFromDto(this PerformanceDto performanceDto)
        {
            return new Performance(performanceDto.Id, performanceDto.Description, TimeSpan.FromTicks(performanceDto.Duration));
        }

        public static Contest ConvertFromDto(this ContestDto contestDto)
        {
            return new Contest(contestDto.Id, contestDto.Name, contestDto.Description, contestDto.TimeKeeperId, contestDto.MaxDuration, status: "Pending");
        }

        public static Division ConvertFromDto(this DivisionDto divisionDto)
        {
            return new Division(divisionDto.Id, divisionDto.Name);
        }

        public static Judge ConvertFromDto(this JudgeDto judgeDto)
        {
            return new Judge(judgeDto.Id, judgeDto.UserId);
        }

        public static PersonName ConvertFromDto(this PersonNameDto nameDto)
        {
            return new PersonName(nameDto.Id, nameDto.FirstName, nameDto.LastName);
        }

        public static Organization ConvertFromDto(this OrganizationDto organizationDto)
        {
            if (organizationDto == null) return null;

            Organization parent = null;

            if (organizationDto.Parent != null)
                parent = ConvertFromDto(organizationDto.Parent);

            return new Organization(organizationDto.Id, organizationDto.Name, parent);
        }

        public static ScoreCard ConvertFromDto(this ScoreCardDto scoreCardDto)
        {
            return new ScoreCard(scoreCardDto.Id, ConvertFromDto(scoreCardDto.Contestant), ConvertFromDto(scoreCardDto.Judge), ConvertFromDto(scoreCardDto.ScorableCriteria));
        }

        public static ICollection<ScorableCriterion> ConvertFromDto(this ICollection<ScorableCriterionDto> scorableCriteriaDto)
        {
            var scorableCriteria = new List<ScorableCriterion>();

            foreach (var scorableCriterionDto in scorableCriteriaDto)
                scorableCriteria.Add(ConvertFromDto(scorableCriterionDto));

            return scorableCriteria;
        }

        public static ScorableCriterion ConvertFromDto(this ScorableCriterionDto scorableCriterionDto)
        {
            var scorableCriterion = new ScorableCriterion(scorableCriterionDto.Id, ConvertFromDto(scorableCriterionDto.ScoreCriterion));
            scorableCriterion.SetScoreAndComment(scorableCriterionDto.Score, scorableCriterionDto.Comment);
            return scorableCriterion;
        }

        public static ScoreCriterion ConvertFromDto(this ScoreCriterionDto scoreCriterionDto)
        {
            var scoreCriterion = new ScoreCriterion(scoreCriterionDto.Id, scoreCriterionDto.CriterionDescription, ConvertFromDto(scoreCriterionDto.ScoreRange));      
            return scoreCriterion;
        }

        public static ScoreRange ConvertFromDto(this ScoreRangeDto scoreRangeDto)
        {
            return new ScoreRange(scoreRangeDto.Min, scoreRangeDto.Max);
        }

        public static ICollection<ShowDto> ConvertToDto(this ICollection<Show> shows)
        {
            var dtos = new List<ShowDto>();

            foreach (var show in shows)
                dtos.Add(ConvertToDto(show));

            return dtos;
        }

        public static ShowDto ConvertToDto(this Show show)
        {
            return new ShowDto()
            {
                Id = show.Id,
                Name = show.Name,
                Description = show.Description,
                //Contests = show.Contests.ConvertToDto()
            };
        }

        public static ICollection<ContestantDto> ConvertToDto(this ICollection<Contestant> contestants)
        {
            var dtos = new List<ContestantDto>();

            foreach (var contestant in contestants)
                dtos.Add(ConvertToDto(contestant));

            return dtos;
        }

        public static ContestantDto ConvertToDto(this Contestant contestant)
        {
            var performerService = new PerformerService(new PerformerRepo(),
                new DivisionRepo(), new PersonNameRepo(), new OrganizationRepo(), new ContestantPerformerRepo());

            var performers = performerService.GetContestantPerformers(contestant.Id);

            var scoreCardService = new ScoreCardService(new ScoreCardRepo(), new ScorableCriterionRepo(), new ContestantRepo());

            var totalScore = scoreCardService.GetContestantTotalScore(contestant.Id, new TimeSpan(0, 5, 0));

            return new ContestantDto()
            {
                Id = contestant.Id,
                Performance = ConvertToDto(contestant.Performance),
                Performers = performers.ConvertToDto(),
                TotalScore = totalScore
            };
        }

        public static ICollection<PerformerDto> ConvertToDto(this ICollection<Performer> performers)
        {
            var dtos = new List<PerformerDto>();

            foreach (var performer in performers)
                dtos.Add(ConvertToDto(performer));

            return dtos;
        }

        public static PerformerDto ConvertToDto(this Performer performer)
        {
            return new PerformerDto()
            {
                Id = performer.Id,
                Division = ConvertToDto(performer.Division),
                Name = ConvertToDto(performer.Name),
                Affiliation = ConvertToDto(performer.Affiliation)
            };
        }

        public static ICollection<DivisionDto> ConvertToDto(this ICollection<Division> divisions)
        {
            var dtos = new List<DivisionDto>();

            foreach (var division in divisions)
                dtos.Add(ConvertToDto(division));

            return dtos;
        }

        public static DivisionDto ConvertToDto(this Division divison)
        {
            return new DivisionDto()
            {
                Id = divison.Id, 
                Name = divison.Name
            };
        }

        public static PerformanceDto ConvertToDto(this Performance performance)
        {
            return new PerformanceDto()
            {
                Id = performance.Id,
                Description = performance.Description,
                Duration = performance.Duration.Ticks
            };
        }

        public static ICollection<ContestDto> ConvertToDto(this ICollection<Contest> contests)
        {
            var dtos = new List<ContestDto>();

            foreach (var contest in contests)
                dtos.Add(ConvertToDto(contest));

            return dtos;
        }

        public static ContestDto ConvertToDto(this Contest contest)
        {
            return new ContestDto()
            {
                Id = contest.Id,
                Contestants = ConvertToDto(contest.Contestants),
                Judges = ConvertToDto(contest.Judges),
                Name = contest.Name,
                TimeKeeperId = contest.TimeKeeperId,
                MaxDuration = contest.MaxDuration,
                Description = contest.Description,
                ScoreCards = ConvertToDto(contest.ScoreCards),
                ScoreCriteria = ConvertToDto(contest.ScoreCriteria)
            };
        }

        public static ICollection<ScoreCardDto> ConvertToDto(this ICollection<ScoreCard> scoreCards)
        {
            var dtos = new List<ScoreCardDto>();

            foreach (var scoreCard in scoreCards)
                dtos.Add(ConvertToDto(scoreCard));

            return dtos;
        }

        public static ICollection<ScoreCriterionDto> ConvertToDto(this ICollection<ScoreCriterion> scoreCriteria)
        {
            var dtos = new List<ScoreCriterionDto>();

            foreach (var scoreCriterion in scoreCriteria)
                dtos.Add(ConvertToDto(scoreCriterion));

            return dtos;
        }

        public static ScoreCardDto ConvertToDto(this ScoreCard scoreCard)
        {
            return new ScoreCardDto()
            {
                Id = scoreCard.Id,
                AverageScore = scoreCard.AverageScore,
                Contestant = ConvertToDto(scoreCard.Contestant),
                Judge = ConvertToDto(scoreCard.Judge),
                ScorableCriteria = ConvertToDto(scoreCard.ScorableCriteria),
                TotalScore = scoreCard.TotalScore
            };
        }

        public static ICollection<ScorableCriterionDto> ConvertToDto(this ICollection<ScorableCriterion> scorableCriteria)
        {
            var dtos = new List<ScorableCriterionDto>();

            foreach (var scorableCriterion in scorableCriteria)
                dtos.Add(ConvertToDto(scorableCriterion));

            return dtos;
        }

        public static ScorableCriterionDto ConvertToDto(this ScorableCriterion scorableCriterion)
        {
            return new ScorableCriterionDto()
            {
                Id = scorableCriterion.Id,
                Comment = scorableCriterion.Comment,
                Score = scorableCriterion.Score,
                ScoreCriterion = ConvertToDto(scorableCriterion.ScoreCriterion)
            };
        }

        public static ScoreCriterionDto ConvertToDto(this ScoreCriterion scoreCriterion)
        {
            return new ScoreCriterionDto()
            {
                Id = scoreCriterion.Id,
                CriterionDescription = scoreCriterion.CriterionDescription,
                ScoreRange = ConvertToDto(scoreCriterion.ScoreRange)
            };
        }

        public static ScoreRangeDto ConvertToDto(this ScoreRange scoreRange)
        {
            return new ScoreRangeDto()
            {
                Min = scoreRange.Min,
                Max = scoreRange.Max
            };
        }

        public static ICollection<JudgeDto> ConvertToDto(this ICollection<Judge> judges)
        {
            var dtos = new List<JudgeDto>();

            foreach (var judge in judges)
                dtos.Add(ConvertToDto(judge));

            return dtos;
        }

        public static JudgeDto ConvertToDto(this Judge judge)
        {
            return new JudgeDto() { Id = judge.Id, UserId = judge.UserId };
        }

        public static PersonNameDto ConvertToDto(this PersonName name)
        {
            return new PersonNameDto() { Id = name.Id, FirstName = name.FirstName, LastName = name.LastName };
        }

        public static ICollection<OrganizationDto> ConvertToDto(this ICollection<Organization> organizations)
        {
            var dtos = new List<OrganizationDto>();

            foreach (var organization in organizations)
                dtos.Add(ConvertToDto(organization));

            return dtos;
        }

        public static OrganizationDto ConvertToDto(this Organization organization)
        {
            OrganizationDto parent = null;

            if (organization.Parent != null)
                parent = ConvertToDto(organization.Parent);

            return new OrganizationDto() { Id = organization.Id, Name = organization.Name, Parent = parent };
        }
    }
}