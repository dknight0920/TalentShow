using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TalentShow.Helpers
{
    public static class CollectionExtensions
    {
        public static bool IsNullOrEmpty<T>(this ICollection<T> collection)
        {
            return collection == null || !collection.Any();
        }

        public static string GetCommaDelimitedListOfString(this ICollection<string> stringValues)
        {
            bool firstTime = true;
            string result = "";

            foreach (var value in stringValues)
            {
                if (!firstTime)
                    result += ",";

                result += value;

                firstTime = false;
            }

            return result;
        }
    }
}
