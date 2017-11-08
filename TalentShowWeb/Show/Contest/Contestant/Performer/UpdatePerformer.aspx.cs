using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShowWeb.Utils;

namespace TalentShowWeb.Show.Contest.Contestant.Performer
{
    public partial class UpdatePerformer : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            labelPageTitle.Text = "Update the Performer";
            labelPageDescription.Text = "Use the form below to update the performer.";

            performerForm.GetSubmitButton().Click += new EventHandler(btnUpdatePerformer_Click);
            performerForm.GetCancelButton().Click += new EventHandler(btnCancel_Click);
        }

        protected void Page_PreRender(object sender, EventArgs e)
        {
            var performer = ServiceFactory.PerformerService.Get(GetPerformerId());
            performerForm.GetFirstNameTextBox().Text = performer.Name.FirstName;
            performerForm.GetLastNameTextBox().Text = performer.Name.LastName;
            PopulateOrganizationsDropDownList(performer.Affiliation.Id);
            PopulateDivisionsDropDownList(performer.Division.Id);
        }

        private void PopulateOrganizationsDropDownList(int organizationId)
        {
            var organizationsDropDownList = performerForm.GetOrganizationsDropDownList();

            organizationsDropDownList.Items.Add(new ListItem("-- Select an Organization --", ""));

            var organizations = ServiceFactory.OrganizationService.GetAll();

            foreach (var organization in organizations)
                organizationsDropDownList.Items.Add(new ListItem(organization.Name, Convert.ToString(organization.Id)));

            organizationsDropDownList.Items.FindByValue(Convert.ToString(organizationId)).Selected = true;
        }

        private void PopulateDivisionsDropDownList(int divisionId)
        {
            var divisionsDropDownList = performerForm.GetDivisionsDropDownList();

            divisionsDropDownList.Items.Add(new ListItem("-- Select a Division --", ""));

            var divisions = ServiceFactory.DivisionService.GetAll();

            foreach (var division in divisions)
                divisionsDropDownList.Items.Add(new ListItem(division.Name, Convert.ToString(division.Id)));

            divisionsDropDownList.Items.FindByValue(Convert.ToString(divisionId)).Selected = true;
        }

        protected void btnUpdatePerformer_Click(object sender, EventArgs e)
        {
            if (!Page.IsValid)
            {
                //TODO
                return;
            }

            var performer = ServiceFactory.PerformerService.Get(GetPerformerId());

            var firstName = performerForm.GetFirstNameTextBox().Text.Trim();
            var lastName = performerForm.GetLastNameTextBox().Text.Trim();
            var organizationId = Convert.ToInt32(performerForm.GetOrganizationsDropDownList().SelectedValue);
            var divisionId = Convert.ToInt32(performerForm.GetDivisionsDropDownList().SelectedValue);

            var personName = new TalentShow.PersonName(performer.Name.Id, firstName, lastName);
            var organization = ServiceFactory.OrganizationService.Get(organizationId);
            var division = ServiceFactory.DivisionService.Get(divisionId);       

            var updatedPerformer = new TalentShow.Performer(performer.Id, division, personName, organization);

            ServiceFactory.PerformerService.Update(updatedPerformer);
            GoToContestantPage();
        }

        protected void btnCancel_Click(object sender, EventArgs e)
        {
            GoToContestantPage();
        }

        protected void btnDelete_Click(object sender, EventArgs e)
        {
            ServiceFactory.PerformerService.Delete(GetPerformerId());
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

        private int GetPerformerId()
        {
            return Convert.ToInt32(Request.QueryString["performerId"]);
        }
    }
}