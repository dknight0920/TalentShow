using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TalentShowDataStorage.Helpers
{
    public static class DataReaderExtensions
    {
        public static object GetColumnValue(this IDataReader reader, string ColumnName)
        {
            return reader.GetValue(reader.GetOrdinal(ColumnName));
        }
    }
}
