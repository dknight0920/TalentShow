<%@ Page Title="Contest" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Contest.aspx.cs" Inherits="TalentShowWeb.Show.Contest.Contest" %>
<%@ Register TagPrefix="custom" TagName="HyperlinkListPanel" Src="~/CustomControls/HyperlinkListPanel.ascx" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <hr />
    <custom:HyperlinkListPanel runat="server" ID="contestantsList" />
    <br />
    <custom:HyperlinkListPanel runat="server" ID="judgesList" />
    <br />
    <custom:HyperlinkListPanel runat="server" ID="scoreCriteriaList" />
</asp:Content>
