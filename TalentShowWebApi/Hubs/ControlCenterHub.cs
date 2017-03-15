using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TalentShowWebApi.Hubs
{
    public class ControlCenterHub : Hub
    {
        public void Changed(string groupName, int showId)
        {
            Clients.Group(groupName).contestsChanged(showId);
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