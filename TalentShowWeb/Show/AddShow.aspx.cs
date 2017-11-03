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

            showForm.GetSubmitButton().Click += new EventHandler(btnAddShow_Click);
            showForm.GetCancelButton().Click += new EventHandler(btnCancel_Click);
        }

        protected void btnAddShow_Click(object sender, EventArgs e)
        {
            if (!Page.IsValid)
            {
                //TODO
                return;
            }

            var showName = showForm.GetShowNameTextBox().Text.Trim();
            var description = showForm.GetDescriptionTextBox().Text.Trim();
            var show = new TalentShow.Show(0, showName, description);
            ServiceFactory.ShowService.Add(show);
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