<%@ Page Title="Talent Show Control Center" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Shows.aspx.cs" Inherits="TalentShowWeb.Shows" %>
<%@ Register TagPrefix="custom" TagName="HyperlinkListPanel" Src="~/CustomControls/HyperlinkListPanel.ascx" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%: Title %></h2>
    <custom:HyperlinkListPanel runat="server" ID="showsList" />
</asp:Content>