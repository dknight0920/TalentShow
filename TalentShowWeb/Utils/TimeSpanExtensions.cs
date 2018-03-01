using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TalentShowWeb.Utils
{
    public static class TimeSpanExtensions
    {

        public static string ToHHMMSS(this TimeSpan time)
        {
            if (time == null)
                return "00:00:00";
            return time.Hours.ToString("00") + ":" + time.Minutes.ToString("00") + ":" + time.Seconds.ToString("00");
        }
    }
}