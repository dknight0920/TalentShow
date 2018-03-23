<%@ Page Title="Show" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Show.aspx.cs" Inherits="TalentShowWeb.Show.Show" %>
<%@ Register TagPrefix="custom" TagName="HyperlinkListPanel" Src="~/CustomControls/HyperlinkListPanel.ascx" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><small>Show:</small> <asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <% if (IsUserAnAdmin())
        { %>
            <div class="form-group">
                <asp:Button runat="server" ID="btnEdit" Text="Edit" OnClick="btnEdit_Click" CssClass="btn btn-sm btn-primary" />
                <% if (IsUserASuperuser())
                    { %>
                        <asp:Button runat="server" ID="btnDelete" Text="Delete" OnClick="btnDelete_Click" OnClientClick="return confirm('Are you sure you want to delete this show?');" CssClass="btn btn-sm btn-danger" />
                <% } %>
                <asp:Button runat="server" ID="btnViewReport" Text="Summary Report" OnClick="btnViewReport_Click" CssClass="btn btn-sm btn-info" />
                <asp:Button runat="server" ID="btnViewJudgeSheetReport" Text="Judge Sheet Report" OnClick="btnViewJudgeSheetReport_Click" CssClass="btn btn-sm btn-success" />
                <asp:Button runat="server" ID="btnViewWinnersReport" Text="Winners Report" OnClick="btnViewWinnersReport_Click" CssClass="btn btn-sm btn-default" />
            </div>
    <% } %>
    <hr />
    <custom:HyperlinkListPanel runat="server" ID="contestsList" />
</asp:Content>