using System;
using System.Collections.Generic;
using TalentShow;
using TalentShow.Repos;
using System.Data;
using TalentShowDataStorage.Helpers;
using TalentShowDataStorage.CrossReferences;
using System.Linq;

namespace TalentShowDataStorage
{
    public class ContestantRepo : Repo<Contestant>, IRepo<Contestant>
    {
        private const string PERFORMANCEID = "performanceid";
        private const string CONTESTANTS = "contestants";

        protected override string GetTableName()
        {
            return CONTESTANTS;
        }

        public override void Add(Contestant contestant)
        {
            base.Add(contestant);
            AddContestantPerformers(contestant);
        }

        private static void AddContestantPerformers(Contestant contestant)
        {
            ContestantPerformerRepo contestantPerformerRepo = new ContestantPerformerRepo();

            foreach (Performer performer in contestant.Performers)
                contestantPerformerRepo.Add(new ContestantPerformer(contestant.Id, performer.Id));
        }

        protected override Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(Contestant contestant)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(PERFORMANCEID, contestant.Performance.Id);
            return fieldNamesAndValues;
        }

        protected override Contestant GetItemFromDataReader(IDataReader reader)
        {
            int id = Convert.ToInt32(reader.GetColumnValue(ID));
            int performanceId = Convert.ToInt32(reader.GetColumnValue(PERFORMANCEID));

            Performance performance = new PerformanceRepo().Get(performanceId);

            var contestPerformerCollection = new ContestantPerformerRepo().GetAll().Where(cp => cp.ContestantId == id);
            var performerRepo = new PerformerRepo();
            var performers = new List<Performer>();

            foreach (var cp in contestPerformerCollection)
                performers.Add(performerRepo.Get(cp.PerformerId));

            return new Contestant(id, performers, performance);
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, PERFORMANCEID };
        }
    }
}
