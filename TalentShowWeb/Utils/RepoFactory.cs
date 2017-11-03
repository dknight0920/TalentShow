using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TalentShowDataStorage;

namespace TalentShowWeb.Utils
{
    internal static class RepoFactory
    {
        internal static ContestantPerformerRepo ContestantPerformerRepo = new ContestantPerformerRepo();
        internal static ContestantRepo ContestantRepo = new ContestantRepo();
        internal static ContestContestantRepo ContestContestantRepo = new ContestContestantRepo();
        internal static ContestJudgeRepo ContestJudgeRepo = new ContestJudgeRepo();
        internal static ContestRepo ContestRepo = new ContestRepo();
        internal static ContestScoreCardRepo ContestScoreCardRepo = new ContestScoreCardRepo();
        internal static ContestScoreCriterionRepo ContestScoreCriterionRepo = new ContestScoreCriterionRepo();
        internal static DivisionRepo DivisionRepo = new DivisionRepo();
        internal static JudgeRepo JudgeRepo = new JudgeRepo();
        internal static OrganizationRepo OrganizationRepo = new OrganizationRepo();
        internal static PerformanceRepo PerformanceRepo = new PerformanceRepo();
        internal static PerformerRepo PerformerRepo = new PerformerRepo();
        internal static PersonNameRepo PersonNameRepo = new PersonNameRepo();
        internal static ScorableCriterionRepo ScorableCriterionRepo = new ScorableCriterionRepo();
        internal static ScoreCardRepo ScoreCardRepo = new ScoreCardRepo();
        internal static ScoreCardScorableCriterionRepo ScoreCardScorableCriterionRepo = new ScoreCardScorableCriterionRepo();
        internal static ScoreCriterionRepo ScoreCriterionRepo = new ScoreCriterionRepo();
        internal static ShowContestRepo ShowContestRepo = new ShowContestRepo();
        internal static ShowRepo ShowRepo = new ShowRepo();
    }
}