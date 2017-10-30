using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TalentShowWeb.Startup))]
namespace TalentShowWeb
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
