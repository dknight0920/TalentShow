﻿<%@ Page Title="Add Show" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AddShow.aspx.cs" Inherits="TalentShowWeb.Show.AddShow" %>
<%@ Register TagPrefix="custom" TagName="ShowForm" Src="~/Show/ShowForm.ascx" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <hr />
    <custom:ShowForm runat="server" ID="showForm" />
</asp:Content>