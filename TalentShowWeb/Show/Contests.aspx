<%@ Page Title="Contests" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Contests.aspx.cs" Inherits="TalentShowWeb.Show.Contests" %>
<%@ Register TagPrefix="custom" TagName="HyperlinkListPanel" Src="~/CustomControls/HyperlinkListPanel.ascx" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%: Title %></h2>
    <custom:HyperlinkListPanel runat="server" ID="contestsList" />
</asp:Content>
