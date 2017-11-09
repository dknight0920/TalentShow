<%@ Page Title="Add Organization" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AddOrganization.aspx.cs" Inherits="TalentShowWeb.Organization.AddOrganization" %>
<%@ Register TagPrefix="custom" TagName="OrganizationForm" Src="~/Organization/OrganizationForm.ascx" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <hr />
    <custom:OrganizationForm runat="server" ID="organizationForm" />
</asp:Content>