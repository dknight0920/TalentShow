using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShowWeb.Models;
using TalentShowWeb.Utils;
using System.IO;
using System.Diagnostics;
using System.Reflection;
using Microsoft.VisualBasic;
using Microsoft.VisualBasic.Devices;
using TalentShowDataStorage.Utils.Models;
using TalentShowDataStorage.Utils;

namespace TalentShowWeb
{
    public partial class SystemInfo : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            RedirectUtil.RedirectUnauthenticatedUserToLoginPage();
            RedirectUtil.RedirectNonAdminUserToHomePage();

            BreadCrumbUtil.DataBind(Page, new List<BreadCrumb>()
            {
                new BreadCrumb(NavUtil.GetHomePageUrl(), "Home"),
                new BreadCrumb(NavUtil.GetUsersPageUrl(), "System Info", IsActive: true),
            });
        }

        protected static string FormatBytes(long bytes)
        {
            string[] Suffix = { "B", "KB", "MB", "GB", "TB" };
            int i;
            double dblSByte = bytes;
            for (i = 0; i < Suffix.Length && bytes >= 1024; i++, bytes /= 1024)
            {
                dblSByte = bytes / 1024.0;
            }

            return String.Format("{0:0.##} {1}", dblSByte, Suffix[i]);
        }

        protected static string GetMemoryUsedByApp() 
        {         
            return FormatBytes(GC.GetTotalMemory(true));         
        }

        protected static string GetTotalPhysicalMemory()
        {        
            return FormatBytes(Convert.ToInt64(new ComputerInfo().TotalPhysicalMemory));
        }

        protected static string GetAvailablePhysicalMemory()
        {
            return FormatBytes(Convert.ToInt64(new ComputerInfo().AvailablePhysicalMemory));
        }

        protected static ICollection<DatabaseFile> GetDatabaseFiles()
        {
            return new DatabaseFileProvider().GetDatabaseFiles();
        }
    }
}