<%@ Page Title="Add Division" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AddDivision.aspx.cs" Inherits="TalentShowWeb.Division.AddDivision" %>
<%@ Register TagPrefix="custom" TagName="DivisionForm" Src="~/Division/DivisionForm.ascx" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <hr />
    <custom:DivisionForm runat="server" ID="divisionForm" />
</asp:Content>