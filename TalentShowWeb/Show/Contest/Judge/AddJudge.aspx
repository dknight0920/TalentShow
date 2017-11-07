<%@ Page Title="Add Judge" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AddJudge.aspx.cs" Inherits="TalentShowWeb.Show.Contest.Judge.AddJudge" %>
<%@ Register TagPrefix="custom" TagName="JudgeForm" Src="~/Show/Contest/Judge/JudgeForm.ascx" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <hr />
    <custom:JudgeForm runat="server" ID="judgeForm" />
</asp:Content>