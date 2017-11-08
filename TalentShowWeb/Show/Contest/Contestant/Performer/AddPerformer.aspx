<%@ Page Title="Add Performer" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AddPerformer.aspx.cs" Inherits="TalentShowWeb.Show.Contest.Contestant.Performer.AddPerformer" %>
<%@ Register TagPrefix="custom" TagName="PerformerForm" Src="~/Show/Contest/Contestant/Performer/PerformerForm.ascx" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <hr />
    <custom:PerformerForm runat="server" ID="performerForm" />
</asp:Content>