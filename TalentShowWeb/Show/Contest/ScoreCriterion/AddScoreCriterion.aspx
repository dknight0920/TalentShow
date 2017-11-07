<%@ Page Title="Add Score Criterion" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AddScoreCriterion.aspx.cs" Inherits="TalentShowWeb.Show.Contest.ScoreCriterion.AddScoreCriterion" %>
<%@ Register TagPrefix="custom" TagName="ScoreCriterionForm" Src="~/Show/Contest/ScoreCriterion/ScoreCriterionForm.ascx" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <hr />
    <custom:ScoreCriterionForm runat="server" ID="scoreCriterionForm" />
</asp:Content>