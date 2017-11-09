<%@ Page Title="Update Division" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="UpdateDivision.aspx.cs" Inherits="TalentShowWeb.Division.UpdateDivision" %>
<%@ Register TagPrefix="custom" TagName="DivisionForm" Src="~/Division/DivisionForm.ascx" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <div class="form-group">
        <asp:Button runat="server" ID="btnDelete" Text="Delete" OnClick="btnDelete_Click" OnClientClick="return confirm('Are you sure you want to delete this division?');" CssClass="btn btn-sm btn-danger" />
    </div>
    <hr />
    <custom:DivisionForm runat="server" ID="divisionForm" />
</asp:Content>