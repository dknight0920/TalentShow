<%@ Page Title="Update User" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="UpdateUser.aspx.cs" Inherits="TalentShowWeb.User.UpdateUser" %>
<%@ Register TagPrefix="custom" TagName="UserForm" Src="~/User/UserForm.ascx" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <div class="form-group">
        <asp:Button runat="server" ID="btnDelete" Text="Delete" OnClick="btnDelete_Click" OnClientClick="return confirm('Are you sure you want to delete this user?');" CssClass="btn btn-sm btn-danger" />
    </div>
    <hr />
    <custom:UserForm runat="server" ID="userForm" />
</asp:Content>