using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShow.Services;
using TalentShowDataStorage;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Show
{
    public partial class AddShow : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            labelPageTitle.Text = "Add a Show";
            labelPageDescription.Text = "Use the form below to create a new show.";
        }

        protected void btnAddShow_Click(object sender, EventArgs e)
        {
            ServiceFactory.ShowService.Add(new TalentShow.Show(0, txtShowName.Text, txtDescription.Text));
            GoToShowsPage();
        }

        protected void btnCancel_Click(object sender, EventArgs e)
        {
            GoToShowsPage();
        }

        private void GoToShowsPage()
        {
            NavUtil.GoToShowsPage(Response);
        }
    }
}