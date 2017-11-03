<%@ Page Title="Update Show" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="UpdateShow.aspx.cs" Inherits="TalentShowWeb.Show.UpdateShow" %>
<%@ Register TagPrefix="custom" TagName="ShowForm" Src="~/Show/ShowForm.ascx" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <hr />
    <custom:ShowForm runat="server" ID="showForm" />
</asp:Content>