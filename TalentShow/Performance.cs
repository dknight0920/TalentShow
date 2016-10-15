using System;
using TalentShow.Repos;

namespace TalentShow
{
    public class Performance : IIdentity
    {
        public int Id { get; private set; }
        public string Description { get; private set; }
        public TimeSpan Duration { get; private set; }

        public Performance(int id, string description, TimeSpan duration)
        {
            Init(id, description, duration);
        }

        public Performance(string description, TimeSpan duration)
        {
            Init(0, description, duration);
        }

        private void Init(int id, string description, TimeSpan duration)
        {
            if (String.IsNullOrWhiteSpace(description))
                throw new ApplicationException("A performance cannot be constructed without a description.");
            if (duration == null)
                throw new ApplicationException("A performance cannot be constructed without a duration.");

            Id = id;
            Description = description;
            Duration = duration;
        }

        public void SetId(int id)
        {
            Id = id;
        }
    }
}