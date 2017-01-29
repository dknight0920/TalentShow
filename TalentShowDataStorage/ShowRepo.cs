using System;
using System.Collections.Generic;
using TalentShow;
using TalentShow.Repos;
using System.Data;
using TalentShowDataStorage.Helpers;
using System.Linq;
using TalentShow.CrossReferences;

namespace TalentShowDataStorage
{
    public class ShowRepo : Repo<Show>, IRepo<Show>
    {
        private const string NAME = "name";
        private const string DESCRIPTION = "description";
        private const string SHOWS = "shows";

        protected override string GetTableName()
        {
            return SHOWS;
        }

        public override void Add(Show show)
        {
            base.Add(show);
            AddShowContests(show);
        }

        private static void AddShowContests(Show show)
        {
            ShowContestRepo showContestRepo = new ShowContestRepo();

            //foreach (Contest contest in show.Contests)
                //showContestRepo.Add(new ShowContest(show.Id, contest.Id));
        }

        protected override Dictionary<string, object> GetFieldNamesAndValuesForInsertOrUpdate(Show show)
        {
            var fieldNamesAndValues = new Dictionary<string, object>();
            fieldNamesAndValues.Add(NAME, show.Name);
            fieldNamesAndValues.Add(DESCRIPTION, show.Description);
            return fieldNamesAndValues;
        }

        protected override Show GetItemFromDataReader(IDataReader reader)
        {
            int id = Convert.ToInt32(reader.GetColumnValue(ID));
            string name = reader.GetColumnValue(NAME).ToString();
            string description = reader.GetColumnValue(DESCRIPTION).ToString();

            Show show = new Show(id, name, description);

            //var showContestCollection = new ShowContestRepo().GetAll().Where(sc => sc.ShowId == show.Id);
            //var contestRepo = new ContestRepo();

            //foreach (var sc in showContestCollection)
                //show.Contests.Add(contestRepo.Get(sc.ContestId));

            return show;
        }

        protected override ICollection<string> GetFieldNamesForSelectStatement()
        {
            return new List<string>() { ID, NAME, DESCRIPTION };
        }
    }
}
