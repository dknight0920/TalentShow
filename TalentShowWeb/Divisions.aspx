<%@ Page Title="Divisions" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Divisions.aspx.cs" Inherits="TalentShowWeb.Divisions" %>
<%@ Register TagPrefix="custom" TagName="HyperlinkListPanel" Src="~/CustomControls/HyperlinkListPanel.ascx" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%: Title %></h2>
    <hr />
    <custom:HyperlinkListPanel runat="server" ID="divisionsList" /> 
</asp:Content>