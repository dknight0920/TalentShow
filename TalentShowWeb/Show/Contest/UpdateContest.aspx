<%@ Page Title="Update Contest" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="UpdateContest.aspx.cs" Inherits="TalentShowWeb.Show.Contest.UpdateContest" %>
<%@ Register TagPrefix="custom" TagName="ContestForm" Src="~/Show/Contest/ContestForm.ascx" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <hr />
    <custom:ContestForm runat="server" ID="contestForm" />
</asp:Content>