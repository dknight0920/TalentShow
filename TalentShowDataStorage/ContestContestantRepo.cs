using System;
using System.Collections.Generic;
using TalentShow.Repos;
using System.Data;
using TalentShowDataStorage.Helpers;
using TalentShow.CrossReferences;


namespace TalentShowDataStorage
{
    public class ContestContestantRepo : CrossReferenceRepo<ContestContestant>, ICrossReferenceRepo<ContestContestant>
    {
        private const string CONTESTID = "contestid";
        private const string CONTESTANTID = "contestantid";
        private const string CONTESTCONTESTANT = "contestcontestant";

        protected override string GetTableName()
        {
            return CONTESTCONTESTANT;
        }

        protected override Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(ContestContestant contestJudge)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(CONTESTID, contestJudge.ContestId);
            fieldNamesAndValues.Add(CONTESTANTID, contestJudge.ContestantId);
            return fieldNamesAndValues;
        }

        protected override ContestContestant GetItemFromDataReader(IDataReader reader)
        {
            int id = Convert.ToInt32(reader.GetColumnValue(ID));
            int contestId = Convert.ToInt32(reader.GetColumnValue(CONTESTID));
            int contestantId = Convert.ToInt32(reader.GetColumnValue(CONTESTANTID));

            return new ContestContestant(id, contestId, contestantId);
        }

        public override void Delete(int id)
        {
            var contestantPerformerRepo = new ContestantPerformerRepo();
            var contestantPerformerCollection = contestantPerformerRepo.GetWhereForeignKeyIs(id);
            var performerRepo = new PerformerRepo();

            foreach (var contestantPerformer in contestantPerformerCollection)
            {
                performerRepo.Delete(contestantPerformer.PerformerId);
                contestantPerformerRepo.Delete(contestantPerformer.Id);
            }

            base.Delete(id);
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, CONTESTID, CONTESTANTID };
        }

        protected override string GetForeignKeyFieldName()
        {
            return CONTESTID;
        }
    }
}
