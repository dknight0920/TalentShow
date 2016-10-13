using System;

namespace TalentShow
{
    public class Performance
    {
        public string Description { get; private set; }
        public TimeSpan Duration { get; private set; }

        public Performance(string description, TimeSpan duration)
        {
            Description = description;
            Duration = duration;
        }
    }
}