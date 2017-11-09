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
                            <th><%= scoreCriterion.CriterionDescription %></th>
                    <% } %>
                </tr>
            </thead>
            <tbody>
                <% foreach(var contestant in GetContest().Contestants) { %>
                    <tr>
                        <td style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis">
                            <%= GetContestantHeadingText(contestant) %>
                        </td>
                        <% foreach(var scoreCriterion in GetContest().ScoreCriteria) { %>
                            <td>
                                <input type="text" class="form-control" />
                            </td>
        		        <% } %>
                    </tr>
                <% } %>
            </tbody>
        </table>
    </div>
</div>