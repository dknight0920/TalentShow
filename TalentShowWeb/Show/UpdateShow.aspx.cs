using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShowWeb.Models;
using TalentShowWeb.Show.Utils;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Show
{
    public partial class UpdateShow : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            RedirectUtil.RedirectUnauthenticatedUserToLoginPage();
            RedirectUtil.RedirectNonAdminUserToHomePage();

            BreadCrumbUtil.DataBind(Page, new List<BreadCrumb>()
            {
                new BreadCrumb(NavUtil.GetHomePageUrl(), "Home"),
                new BreadCrumb(NavUtil.GetShowsPageUrl(), "Shows"),
                new BreadCrumb(NavUtil.GetShowPageUrl(GetShowId()), "Show"),
                new BreadCrumb(NavUtil.GetUpdateShowPageUrl(GetShowId()), "Update Show", IsActive: true),
            });

            labelPageTitle.Text = "Update the Show";
            labelPageDescription.Text = "Use the form below to update the show.";

            showForm.GetSubmitButton().Click += new EventHandler(btnUpdateShow_Click);
            showForm.GetCancelButton().Click += new EventHandler(btnCancel_Click);
        }

        protected void Page_PreRender(object sender, EventArgs e)
        {
            var show = ServiceFactory.ShowService.Get(GetShowId());
            showForm.GetShowNameTextBox().Text = show.Name;
            showForm.GetDescriptionTextBox().Text = show.Description;
        }

        protected void btnUpdateShow_Click(object sender, EventArgs e)
        {
            if (!Page.IsValid)
            {
                //TODO
                return;
            }

            var showName = showForm.GetShowNameTextBox().Text.Trim();
            var description = showForm.GetDescriptionTextBox().Text.Trim();
            var show = new TalentShow.Show(GetShowId(), showName, description);
            ServiceFactory.ShowService.Update(show);

            if (showForm.GetFileImportDataFileUpload().HasFile)
                ImportContests(show, new MemoryStream(showForm.GetFileImportDataFileUpload().FileBytes));

            GoToShowPage();
        }

        private void ImportContests(TalentShow.Show show, Stream fileStream)
        {
            ShowDataImporter.Import(show, fileStream);
        }

        protected void btnCancel_Click(object sender, EventArgs e)
        {
            GoToShowPage();
        }

        private void GoToShowPage()
        {
            NavUtil.GoToShowPage(Response, GetShowId());
        }

        private int GetShowId()
        {
            return Convert.ToInt32(Request.QueryString["showId"]);
        }
    }
}