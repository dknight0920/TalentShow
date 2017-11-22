<%@ Page Title="Report" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Report.aspx.cs" Inherits="TalentShowWeb.Show.Report" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><small>Show:</small> <asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <hr />
    <%  foreach (var contest in contests)
        { %>
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
                            </tr>
                    <%  } %>
                </tbody>
            </table>
    <%  } %>
</asp:Content>