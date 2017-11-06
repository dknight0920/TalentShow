<%@ Page Title="Add Contestant" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AddContestant.aspx.cs" Inherits="TalentShowWeb.Show.Contest.Contestant.AddContestant" %>
<%@ Register TagPrefix="custom" TagName="ContestantForm" Src="~/Show/Contest/Contestant/ContestantForm.ascx" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <hr />
    <custom:ContestantForm runat="server" ID="contestantForm" />
</asp:Content>