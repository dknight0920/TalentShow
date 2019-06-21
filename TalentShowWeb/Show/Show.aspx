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
                <div class="dropdown" style="display:inline-block;">
                    <button class="btn btn-sm btn-info dropdown-toggle" type="button" id="dropdownReportMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Reports
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownReportMenu">
                        <li><asp:LinkButton runat="server" ID="btnViewReport" Text="Summary Report" OnClick="btnViewReport_Click" CssClass="dropdown-item" /></li>
                        <li><asp:LinkButton runat="server" ID="btnViewJudgeSheetReport" Text="Judge Sheet Report" OnClick="btnViewJudgeSheetReport_Click" CssClass="dropdown-item" /></li>
                        <li><asp:LinkButton runat="server" ID="btnViewWinnersReport" Text="Winners Report" OnClick="btnViewWinnersReport_Click" CssClass="dropdown-item" /></li>
                        <% if (IsUserASuperuser())
                           { %>
                            <li><asp:LinkButton runat="server" ID="btnDownloadShowContestantAffiliationReport" Text="Contestant Affiliation Report" OnClick="btnDownloadShowContestantAffiliationReport_Click" CssClass="dropdown-item" /></li>
                        <% } %>
                    </ul>
                </div>
            </div>
    <% } %>
    <hr />
    <custom:HyperlinkListPanel runat="server" ID="contestsList" />
</asp:Content>