<%@ Page Title="Winners Report" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="WinnersReport.aspx.cs" Inherits="TalentShowWeb.Show.WinnersReport" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><small>Show:</small> <asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <hr />
    <%  foreach (var contest in contests)
        { %>
            <p style='overflow:hidden;page-break-before:always;'></p>
            <h2><small>Contest:</small> <%= contest.Name %> (<%= contest.Status %>)</h2>
            <table class="table table-bordered table-condensed table-striped">
                <thead>
                    <tr>
                        <th>
                            Place
                        </th>
                        <th>
                            Contestant
                        </th>
                        <th>
                            Performance Description
                        </th>
                        <th>
                            Organization
                        </th>
                        <th>
                            Parent Organization
                        </th>
                        <th class="text-right">
                            Final Score
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <% 

                        var contestants = GetReportContestants(contest);
                        for (int i = 4; i > 0; i--)
                        {
                            var contestant = contestants.ElementAt(i-1);

                            if (contestant == null)
                                continue;
                            %>
                            <tr>
                                <td>
                                    <%
                                        
                                        if(i == 4)
                                            Response.Write("4th");
                                        if(i == 3)
                                            Response.Write("3rd");
                                        if(i == 2)
                                            Response.Write("2nd");
                                        if(i == 1)
                                            Response.Write("1st");
                                    %>
                                </td>
                                <td style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                                    <a href="<% Response.Write(Page.ResolveUrl(GetContestantURL(contestant.ContestantId, contest))); %>">
                                        <% Response.Write(contestant.Name.Length > 25 ? contestant.Name.Substring(0, 25) + " ..." : contestant.Name); %>
                                    </a>  
                                </td>
                                <td>
                                    <% Response.Write(contestant.PerformanceDescription.Length > 25 ? contestant.PerformanceDescription.Substring(0, 25) + " ..." : contestant.PerformanceDescription); %>
                                </td>
                                <td>
                                    <% Response.Write(contestant.Organization); %>
                                </td>
                                <td>
                                    <% Response.Write(contestant.ParentOrganization); %>
                                </td>
                                <td class="text-right">
                                    <% Response.Write(contestant.FinalScore); %>
                                </td>
                            </tr>
                    <% } %>
                </tbody>
            </table>
    <%  } %>
    <p style='overflow:hidden;page-break-before:always;'></p>
</asp:Content>