<%@ Page Title="Report" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Report.aspx.cs" Inherits="TalentShowWeb.Show.Report" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <hr />
    <%  foreach (var contest in contests)
        { %>
            <h2><%= contest.Name %></h2>
            <table class="table table-bordered table-condensed table-striped">
                <thead>
                    <tr>
                        <th>
                            Contestant
                        </th>
                        <th>
                            Performance Description
                        </th>
                        <th>
                            Performance Duration
                        </th>
                        <th>
                            Total Score
                        </th>
                        <th>
                            Penalty Points
                        </th>
                        <th>
                            Final Score
                        </th>
                        <th>
                            Number of Score Cards
                        </th>
                        <th>
                            Number of Judges
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <%  foreach (var contestant in GetReportContestants(contest))
                        { %>
                            <tr <%= (contestant.NumberOfJudges > contestant.NumberOfScoreCards ? "class=\"warning\"" : "") %>>
                                <td>
                                    <% Response.Write(contestant.Name); %>
                                </td>
                                <td>
                                    <% Response.Write(contestant.PerformanceDescription); %>
                                </td>
                                <td>
                                    <% Response.Write(contestant.PerformanceDuration.Hours.ToString("00") + ":" + contestant.PerformanceDuration.Minutes.ToString("00") + ":" + contestant.PerformanceDuration.Seconds.ToString("00")); %>
                                </td>
                                <td>
                                    <% Response.Write(contestant.TotalScore); %>
                                </td>
                                <td>
                                    <% Response.Write(contestant.PenaltyPoints); %>
                                </td>
                                <td>
                                    <% Response.Write(contestant.FinalScore); %>
                                </td>
                                <td>
                                    <% Response.Write(contestant.NumberOfScoreCards); %>
                                </td>
                                <td>
                                    <% Response.Write(contestant.NumberOfJudges); %>
                                </td>
                            </tr>
                    <%  } %>
                </tbody>
            </table>
    <%  } %>
</asp:Content>