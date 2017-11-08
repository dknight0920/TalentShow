<%@ Page Title="Update Performer" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="UpdatePerformer.aspx.cs" Inherits="TalentShowWeb.Show.Contest.Contestant.Performer.UpdatePerformer" %>
<%@ Register TagPrefix="custom" TagName="PerformerForm" Src="~/Show/Contest/Contestant/Performer/PerformerForm.ascx" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <div class="form-group">
        <asp:Button runat="server" ID="btnDelete" Text="Delete" OnClick="btnDelete_Click" OnClientClick="return confirm('Are you sure you want to delete this performer?');" CssClass="btn btn-sm btn-danger" />
    </div>
    <hr />
    <custom:PerformerForm runat="server" ID="performerForm" />
</asp:Content>