<%@ Page Title="Update Organization" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="UpdateOrganization.aspx.cs" Inherits="TalentShowWeb.Organization.UpdateOrganization" %>
<%@ Register TagPrefix="custom" TagName="OrganizationForm" Src="~/Organization/OrganizationForm.ascx" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <div class="form-group">
        <asp:Button runat="server" ID="btnDelete" Text="Delete" OnClick="btnDelete_Click" OnClientClick="return confirm('Are you sure you want to delete this organization?');" CssClass="btn btn-sm btn-danger" />
    </div>
    <hr />
    <custom:OrganizationForm runat="server" ID="organizationForm" />
</asp:Content>