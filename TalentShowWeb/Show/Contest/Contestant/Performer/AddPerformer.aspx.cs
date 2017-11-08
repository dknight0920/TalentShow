using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Show.Contest.Contestant.Performer
{
    public partial class AddPerformer : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            labelPageTitle.Text = "Add a Performer";
            labelPageDescription.Text = "Use the form below to create a new performer.";

            performerForm.GetSubmitButton().Click += new EventHandler(btnAddPerformer_Click);
            performerForm.GetCancelButton().Click += new EventHandler(btnCancel_Click);
        }

        protected void Page_PreRender(object sender, EventArgs e)
        {
            PopulateOrganizationsDropDownList();
            PopulateDivisionsDropDownList();
        }

        private void PopulateOrganizationsDropDownList()
        {
            var organizationsDropDownList = performerForm.GetOrganizationsDropDownList();

            organizationsDropDownList.Items.Add(new ListItem("-- Select an Organization --", ""));

            var organizations = ServiceFactory.OrganizationService.GetAll();

            foreach (var organization in organizations)
                organizationsDropDownList.Items.Add(new ListItem(organization.Name, Convert.ToString(organization.Id)));

            organizationsDropDownList.Items.FindByValue("").Selected = true;
        }

        private void PopulateDivisionsDropDownList()
        {
            var divisionsDropDownList = performerForm.GetDivisionsDropDownList();

            divisionsDropDownList.Items.Add(new ListItem("-- Select a Division --", ""));

            var divisions = ServiceFactory.DivisionService.GetAll();

            foreach (var division in divisions)
                divisionsDropDownList.Items.Add(new ListItem(division.Name, Convert.ToString(division.Id)));

            divisionsDropDownList.Items.FindByValue("").Selected = true;
        }

        protected void btnAddPerformer_Click(object sender, EventArgs e)
        {
            if (!Page.IsValid)
            {
                //TODO
                return;
            }

            var firstName = performerForm.GetFirstNameTextBox().Text.Trim();
            var lastName = performerForm.GetLastNameTextBox().Text.Trim();
            var organizationId = Convert.ToInt32(performerForm.GetOrganizationsDropDownList().SelectedValue);
            var divisionId = Convert.ToInt32(performerForm.GetDivisionsDropDownList().SelectedValue);

            var personName = new TalentShow.PersonName(0, firstName, lastName);
            var organization = ServiceFactory.OrganizationService.Get(organizationId);
            var division = ServiceFactory.DivisionService.Get(divisionId);

            var performer = new TalentShow.Performer(0, division, personName, organization);

            ServiceFactory.PerformerService.AddContestantPerformer(GetContestantId(), performer);
            GoToContestantPage();
        }

        protected void btnCancel_Click(object sender, EventArgs e)
        {
            GoToContestantPage();
        }

        private void GoToContestantPage()
        {
            NavUtil.GoToContestantPage(Response, GetShowId(), GetContestId(), GetContestantId());
        }

        private int GetShowId()
        {
            return Convert.ToInt32(Request.QueryString["showId"]);
        }

        private int GetContestId()
        {
            return Convert.ToInt32(Request.QueryString["contestId"]);
        }

        private int GetContestantId()
        {
            return Convert.ToInt32(Request.QueryString["contestantId"]);
        }
    }
}