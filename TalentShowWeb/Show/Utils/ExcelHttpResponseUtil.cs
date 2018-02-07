using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TalentShowWeb.Show.Utils
{
    public static class ExcelHttpResponseUtil
    {
        public static void MakeResponse(byte[] excelBytes)
        {
            var response = HttpContext.Current.Response;

            response.Clear();
            response.ClearContent();
            response.ClearHeaders();
            response.Buffer = true;
            response.ContentEncoding = System.Text.Encoding.UTF8;
            response.Cache.SetCacheability(HttpCacheability.NoCache);
            response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            response.AddHeader("content-disposition", "attachment;filename=TalentShowSummaryReport.xlsx");

            response.BinaryWrite(excelBytes);

            response.Flush();
            response.End();
        }
    }
}