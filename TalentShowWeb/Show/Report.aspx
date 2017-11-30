<%@ Page Title="Report" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Report.aspx.cs" Inherits="TalentShowWeb.Show.Report" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><small>Show:</small> <asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <div class="form-group">
        <asp:Label runat="server" Text="Refresh every" AssociatedControlID="dropDownListRefreshRate" CssClass="control-label" />
        <asp:DropDownList runat="server" AutoPostBack="true" ID="dropDownListRefreshRate" CssClass="form-control" Width="275" >
            <asp:ListItem Value="2"> 2 Minutes </asp:ListItem>
            <asp:ListItem Value="5"> 5 Minutes </asp:ListItem>
            <asp:ListItem Value="10"> 10 Minutes </asp:ListItem>
            <asp:ListItem Value="15"> 15 Minutes </asp:ListItem>
            <asp:ListItem Value="30"> 30 Minutes </asp:ListItem>
            <asp:ListItem Value="45"> 45 Minutes </asp:ListItem>
            <asp:ListItem Value="60"> 1 hour </asp:ListItem>
            <asp:ListItem Value="120"> 2 hours </asp:ListItem>
        </asp:DropDownList>
        <asp:Timer runat="server" ID="refreshTimer" />
    </div>
    <hr />
    <%  foreach (var contest in contests)
        { %>
            <p style='overflow:hidden;page-break-before:always;'></p>
            <h2><small>Contest:</small> <%= contest.Name %></h2>
            <table class="table table-bordered table-condensed table-striped">
                <thead>
                    <tr>
                        <th>
                            Contestant
                        </th>
                        <th>
                            Performance Description
                        </th>
                        <th class="text-right">
                            Performance Duration
                        </th>
                        <th class="text-right">
                            Total Score
                        </th>
                        <th class="text-right">
                            Penalty Points
                        </th>
                        <th class="text-right">
                            Final Score
                        </th>
                        <th class="text-right">
                            Number of Score Cards
                        </th>
                        <th class="text-right">
                            Lowest Score
                        </th>
                        <th class="text-right">
                            Sum of Top Scores
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <%  foreach (var contestant in GetReportContestants(contest))
                        { %>
                            <tr>
                                <td style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                                    <a href="<% Response.Write(Page.ResolveUrl(GetContestantURL(contestant.ContestantId, contest))); %>">
                                        <% Response.Write(contestant.Name.Length > 25 ? contestant.Name.Substring(0, 25) + " ..." : contestant.Name); %>
                                    </a>  
                                </td>
                                <td>
                                    <% Response.Write(contestant.PerformanceDescription.Length > 25 ? contestant.PerformanceDescription.Substring(0, 25) + " ..." : contestant.PerformanceDescription); %>
                                </td>
                                <td class="text-right <%= (contestant.PerformanceDuration.TotalMilliseconds == 0 ? " warning" : "") %>">
                                    <% Response.Write(contestant.PerformanceDuration.Hours.ToString("00") + ":" + contestant.PerformanceDuration.Minutes.ToString("00") + ":" + contestant.PerformanceDuration.Seconds.ToString("00")); %>
                                </td>
                                <td class="text-right">
                                    <% Response.Write(contestant.TotalScore); %>
                                </td>
                                <td class="text-right">
                                    <% Response.Write(contestant.PenaltyPoints); %>
                                </td>
                                <td class="text-right">
                                    <% Response.Write(contestant.FinalScore); %>
                                </td>
                                <td class="text-right <%= (contestant.NumberOfJudges > contestant.NumberOfScoreCards ? " warning" : "") %>">
                                    <% Response.Write(contestant.NumberOfScoreCards); %> of <% Response.Write(contestant.NumberOfJudges); %>
                                </td>
                                <td class="text-right">
                                    <% Response.Write(contestant.LowestScore); %>
                                </td>
                                <td class="text-right">
                                    <% Response.Write(contestant.SumOfTopScores); %>
                                </td>
                            </tr>
                    <%  } %>
                </tbody>
            </table>
    <%  } %>
    <p style='overflow:hidden;page-break-before:always;'></p>
</asp:Content>