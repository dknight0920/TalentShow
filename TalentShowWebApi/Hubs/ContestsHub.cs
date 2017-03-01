using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TalentShowWebApi.Hubs
{
    public class ContestsHub : Hub
    {
        public void ContestsChanged(string groupName)
        {
            Clients.Group(groupName).contestsChanged();
        }

        public void JoinGroup(string groupName)
        {
            Groups.Add(this.Context.ConnectionId, groupName);
        }
    }
}