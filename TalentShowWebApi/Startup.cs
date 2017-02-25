using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using Microsoft.AspNet.SignalR;

[assembly: OwinStartup(typeof(TalentShowWebApi.Startup))]

namespace TalentShowWebApi
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.MapSignalR(new HubConfiguration
            {      
                EnableJSONP = true // Require JSONP to work cross domain
            });
        }
    }
}
