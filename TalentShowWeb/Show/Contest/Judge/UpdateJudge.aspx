<%@ Page Title="Update Judge" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="UpdateJudge.aspx.cs" Inherits="TalentShowWeb.Show.Contest.Judge.UpdateJudge" %>
<%@ Register TagPrefix="custom" TagName="JudgeForm" Src="~/Show/Contest/Judge/JudgeForm.ascx" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <div class="form-group">
        <asp:Button runat="server" ID="btnDelete" Text="Delete" OnClick="btnDelete_Click" OnClientClick="return confirm('Are you sure you want to delete this judge?');" CssClass="btn btn-sm btn-danger" />
    </div>
    <hr />
    <custom:JudgeForm runat="server" ID="judgeForm" />
</asp:Content>