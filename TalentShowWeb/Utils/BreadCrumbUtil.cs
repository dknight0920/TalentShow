using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShowWeb.Models;

namespace TalentShowWeb.Utils
{
    public static class BreadCrumbUtil
    {
        public static void DataBind(Page page, IEnumerable<BreadCrumb> breadCrumbs)
        {
            try
            {
                Repeater rp = (Repeater)page.Master.FindControl("breadCrumbItems");
                rp.DataSource = breadCrumbs;
                rp.DataBind();
            }
            catch { }
        }
    }
}