﻿using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TalentShowWebApi.Hubs
{
    public class ControlCenterHub : Hub
    {
        public void ShowChanged(string groupName)
        {
            Clients.Group(groupName).showsChanged();
        }

        public void DivisionChanged(string groupName)
        {
            Clients.Group(groupName).divisionsChanged();
        }

        public void ContestChanged(string groupName, int showId)
        {
            Clients.Group(groupName).contestsChanged(showId);
        }

        public void ContestantChanged(string groupName, int contestId)
        {
            Clients.Group(groupName).contestantsChanged(contestId);
        }

        public void JudgeChanged(string groupName, int contestId)
        {
            Clients.Group(groupName).judgesChanged(contestId);
        }

        public void ScoreCriterionChanged(string groupName, int contestId)
        {
            Clients.Group(groupName).scoreCriteriaChanged(contestId);
        }

        public void ScoreCardChanged(string groupName, int contestantId)
        {
            Clients.Group(groupName).scoreCardsChanged(contestantId);
        }

        public void PerformerChanged(string groupName, int contestantId)
        {
            Clients.Group(groupName).performersChanged(contestantId);
        }

        public void OrganizationChanged(string groupName)
        {
            Clients.Group(groupName).organizationsChanged();
        }

        public void UserChanged(string groupName)
        {
            Clients.Group(groupName).usersChanged();
        }

        public void JoinGroup(string groupName)
        {
            Groups.Add(this.Context.ConnectionId, groupName);
        }

        public void LeaveGroup(string groupName)
        {
            Groups.Remove(this.Context.ConnectionId, groupName);
        }
    }
}