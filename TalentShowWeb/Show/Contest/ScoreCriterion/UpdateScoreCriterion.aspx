<%@ Page Title="Update Score Criterion" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="UpdateScoreCriterion.aspx.cs" Inherits="TalentShowWeb.Show.Contest.ScoreCriterion.UpdateScoreCriterion" %>
<%@ Register TagPrefix="custom" TagName="ScoreCriterionForm" Src="~/Show/Contest/ScoreCriterion/ScoreCriterionForm.ascx" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <div class="form-group">
        <asp:Button runat="server" ID="btnDelete" Text="Delete" OnClick="btnDelete_Click" OnClientClick="return confirm('Are you sure you want to delete this score criterion?');" CssClass="btn btn-sm btn-danger" />
    </div>
    <hr />
    <custom:ScoreCriterionForm runat="server" ID="scoreCriterionForm" />
</asp:Content>