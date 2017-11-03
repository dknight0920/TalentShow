using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TalentShow.Services;
using TalentShowDataStorage;

namespace TalentShowWeb.Utils
{
    internal static class ServiceFactory
    {
        internal static ContestantService ContestantService = new ContestantService(RepoFactory.ContestantRepo, RepoFactory.PerformanceRepo, RepoFactory.ContestContestantRepo);
        internal static ContestService ContestService = new ContestService(RepoFactory.ContestRepo, RepoFactory.ShowContestRepo);
        internal static DivisionService DivisionService = new DivisionService(RepoFactory.DivisionRepo);
        internal static JudgeService JudgeService = new JudgeService(RepoFactory.JudgeRepo, RepoFactory.ContestJudgeRepo);
        internal static OrganizationService OrganizationService = new OrganizationService(RepoFactory.OrganizationRepo);
        internal static PerformerService PerformerService = new PerformerService(RepoFactory.PerformerRepo, RepoFactory.DivisionRepo, RepoFactory.PersonNameRepo, RepoFactory.OrganizationRepo, RepoFactory.ContestantPerformerRepo);
        internal static ScoreCardService ScoreCardService = new ScoreCardService(RepoFactory.ScoreCardRepo, RepoFactory.ScorableCriterionRepo, RepoFactory.ContestantRepo);
        internal static ScoreCriterionService ScoreCriterionService = new ScoreCriterionService(RepoFactory.ScoreCriterionRepo, RepoFactory.ContestScoreCriterionRepo);
        internal static ShowService ShowService = new ShowService(RepoFactory.ShowRepo);
    }
}