<%@ Page Title="Add Show" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AddShow.aspx.cs" Inherits="TalentShowWeb.Show.AddShow" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <hr />
    <div class="form-group">
        <asp:Label runat="server" Text="Show Name" AssociatedControlID="txtShowName" CssClass="control-label" />
        <asp:TextBox runat="server" ID="txtShowName" CssClass="form-control" />
    </div>
    <div class="form-group">
        <asp:Label runat="server" Text="Description" AssociatedControlID="txtDescription" CssClass="control-label" />
        <asp:TextBox runat="server" ID="txtDescription" CssClass="form-control" />
    </div>
    <br />
    <div class="form-group">
        <asp:Button runat="server" ID="btnAddShow" Text="Submit" OnClick="btnAddShow_Click" CssClass="btn btn-primary" />
        <asp:Button runat="server" ID="btnCancel" Text="Cancel" OnClick="btnCancel_Click" CssClass="btn btn-danger" />
    </div>
</asp:Content>