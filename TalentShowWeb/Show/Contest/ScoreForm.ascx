<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ScoreForm.ascx.cs" Inherits="TalentShowWeb.Show.Contest.ScoreForm" %>

<div class="panel panel-default">
    <div class="panel-heading clearfix">
        <h3 class="panel-title pull-left">Score Form</h3>
    </div>
    <div class="panel-body">
        <table class="table table-bordered table-condensed table-striped">
            <thead>
                <tr>
                    <th>Contestant</th>
                    <% foreach(var scoreCriterion in GetContest().ScoreCriteria) { %>
                            <th><% Response.Write(scoreCriterion.CriterionDescription); %></th>
                    <% } %>
                </tr>
            </thead>
            <tbody>
                <% foreach(var contestant in GetContest().Contestants) { %>
                    <tr>
                        <td style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis">
                            <%= GetContestantHeadingText(contestant) %>
                        </td>
                        <% 
                            var scoreCard = GetScoreCard(contestant);
                            foreach (var scoreCriterion in GetContest().ScoreCriteria) {
                                var score = GetScore(scoreCard, scoreCriterion);
                        %>
                            <td>
                                <div class="form-group has-success has-feedback">
                                    <input type="text" onChange="SetScore(<% Response.Write(GetContest().Id); %>, <% Response.Write(contestant.Id); %>, <% Response.Write(scoreCriterion.Id); %>, this.value, this);" value="<% Response.Write(score); %>"" class="form-control" />
                                    <span class="glyphicon glyphicon-ok form-control-feedback"></span>
                                </div>
                            </td>
        		        <% } %>
                    </tr>
                <% } %>
            </tbody>
        </table>
    </div>
</div>