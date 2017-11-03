<%@ Page Title="Contest" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Contestant.aspx.cs" Inherits="TalentShowWeb.Show.Contest.Contestant.Contestant" %>
<%@ Register TagPrefix="custom" TagName="HyperlinkListPanel" Src="~/CustomControls/HyperlinkListPanel.ascx" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <hr />
    <custom:HyperlinkListPanel runat="server" ID="performersList" />
</asp:Content>