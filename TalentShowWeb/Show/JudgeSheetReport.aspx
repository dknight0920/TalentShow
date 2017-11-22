<%@ Page Title="Judge Sheet Report" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="JudgeSheetReport.aspx.cs" Inherits="TalentShowWeb.Show.JudgeSheetReport" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><small>Show:</small> <asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <hr />
    <%  foreach (var contest in contests)
        { %>
            <h2><small>Contest:</small> <%= contest.Name %></h2>     
            <%  foreach (var contestant in GetReportContestants(contest))
                { %>
                    <img src='<%= Page.ResolveUrl("~/Images/JudgeSheetHeader.png") %>' />
                    <br />
                    <h3><small>Contestant:</small> <% Response.Write(contestant.Name); %></h3>
                    <%  foreach (var scoreCard in contestant.ScoreCards)
                        { %>
                        <h3><small>Judge:</small> <% Response.Write(GetJudgeUserName(scoreCard.Judge.UserId)); %></h3>
                        <table class="table table-bordered table-condensed table-striped">
                            <thead>
                                <tr>
                                    <%  foreach (var scorableCriterion in scoreCard.ScorableCriteria)
                                        { %>
                                            <th>
                                                <%= scorableCriterion.ScoreCriterion.CriterionDescription %>
                                            </th>
                                    <%  } %>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <%  foreach (var scorableCriterion in scoreCard.ScorableCriteria)
                                        { %>
                                            <td>
                                                <% Response.Write(scorableCriterion.Score); %>
                                            </td>
                                    <%  } %>
                                </tr>
                                <tr>
                                    <%  foreach (var scorableCriterion in scoreCard.ScorableCriteria)
                                        { %>
                                            <td>
                                                <% Response.Write(scorableCriterion.Comment ?? ""); %>
                                            </td>
                                    <%  } %>
                                </tr>
                            </tbody>     
                        </table>
                    <% } %>
                <div class="well">
                    <table style="width:30%;">
                        <tr>
                            <td class="pull-left">
                                <h4>Total Score:</h4>
                            </td>
                            <td class="pull-right">
                                <h4><% Response.Write(contestant.TotalScore); %></h4>
                            </td>
                        </tr>
                        <tr>
                            <td class="pull-left">
                                <h4>Penalty Points:</h4>
                            </td>
                            <td class="pull-right">
                                <h4><% Response.Write(contestant.PenaltyPoints); %></h4>
                            </td>
                        </tr>
                        <tr>
                            <td class="pull-left">
                                <h3>Final Score:</h3>
                            </td>
                            <td class="pull-right">
                                <h3><% Response.Write(contestant.FinalScore); %></h3>
                            </td>
                        </tr>
                    </table>
                </div>
            <br />
            <%  } %>
    <%  } %>
</asp:Content>