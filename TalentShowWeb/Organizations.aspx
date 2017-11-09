<%@ Page Title="Organizations" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Organizations.aspx.cs" Inherits="TalentShowWeb.Organizations" %>
<%@ Register TagPrefix="custom" TagName="HyperlinkListPanel" Src="~/CustomControls/HyperlinkListPanel.ascx" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%: Title %></h2>
    <hr />
    <custom:HyperlinkListPanel runat="server" ID="organizationsList" /> 
</asp:Content>