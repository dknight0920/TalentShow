﻿<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ScoreForm.ascx.cs" Inherits="TalentShowWeb.Show.Contest.ScoreForm" %>

<div class="panel panel-default">
    <div class="panel-heading clearfix">
        <h3 class="panel-title pull-left">Score Form</h3>
    </div>
    <div class="panel-body">
        <table class="table table-bordered table-condensed table-striped">
            <thead>
                <tr>
                    <% var contestants = GetContest().Contestants; %>
                    <th>Contestant <span class="badge"><% Response.Write(contestants.Count()); %></span></th>
                    <% foreach(var scoreCriterion in GetContest().ScoreCriteria) { %>
                            <th><% Response.Write(scoreCriterion.CriterionDescription); %></th>
                    <% } %>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <% foreach(var contestant in contestants)
                    {
                    var scoreCard = GetScoreCard(contestant);  
                %>
                    <tr>
                        <td style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis">
                            <%= GetContestantHeadingText(contestant) %>
                        </td>
                        <%               
                            foreach (var scoreCriterion in GetContest().ScoreCriteria) {
                                var score = GetScore(scoreCard, scoreCriterion);
                                var comment = GetComment(scoreCard, scoreCriterion);
                        %>
                            <td>
                                <div class="form-group has-success has-feedback">
                                    <input type="text" onkeypress="AddWarningFeedback(this)" onBlur="SetScore(<% Response.Write(GetContest().Id); %>, <% Response.Write(contestant.Id); %>, <% Response.Write(scoreCriterion.Id); %>, this.value, this);" value="<% Response.Write(score); %>"" class="form-control" />
                                    <span class="glyphicon glyphicon-ok form-control-feedback"></span>
                                </div>
                                <div class="form-group has-success has-feedback comments_<%= scoreCard.Id %>" style="display: none;">
                                    <input type="text" placeholder="Comment" onkeypress="AddWarningFeedback(this)" onBlur="SetComment(<% Response.Write(GetContest().Id); %>, <% Response.Write(contestant.Id); %>, <% Response.Write(scoreCriterion.Id); %>, this.value, this);" value="<% Response.Write(comment); %>"" class="form-control" />
                                    <span class="glyphicon glyphicon-ok form-control-feedback"></span>             
                                </div>
                            </td>
        		        <% } %>
                        <td>
                            <button class="btn btn-sm btn-primary" onclick="ShowCommentFields('comments_<%= scoreCard.Id %>', event)">Comment</button>
                        </td>
                    </tr>
                <% } %>
            </tbody>
        </table>
    </div>
</div>