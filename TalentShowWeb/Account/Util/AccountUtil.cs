using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TalentShowWeb.Models;
using TalentShowWeb.Utils;
using System.Web.Security;
using Microsoft.AspNet.Identity;

namespace TalentShowWeb.Account.Util
{
    public class AccountUtil
    {
        private ApplicationUserManager manager;
        private ApplicationRoleManager roleManager;
        private HttpContext context;

        public AccountUtil(HttpContext Context)
        {
            context = Context;
            manager = Context.GetOwinContext().GetUserManager<ApplicationUserManager>();
            roleManager = Context.GetOwinContext().GetUserManager<ApplicationRoleManager>();
        }

        public IEnumerable<ApplicationUser> GetAllUsers()
        {       
            return manager.Users.OrderBy(u => u.Email);
        }

        public ApplicationUser GetUser(string userId)
        {
            return manager.Users.FirstOrDefault(u => u.Id == userId);
        }

        public string GetUserEmail(string userId)
        {
            var user = manager.Users.FirstOrDefault(u => u.Id == userId);
            return user == null ? "" : user.Email;
        }

        public bool IsUserAnAdmin()
        {
            return IsUserInRole("Admin");
        }

        public bool IsUserAJudge()
        {
            return IsUserInRole("Judge");
            
        }

        public bool IsUserATimeKeeper()
        {
            return IsUserInRole("TimerKeeper");
        }

        public bool IsUserInRole(string roleName)
        {
            var role = roleManager.Roles.FirstOrDefault(r => r.Name == roleName);

            if (role == null) return false;

            var userId = context.User.Identity.GetUserId();

            var user = role.Users.FirstOrDefault(u => u.UserId == userId);

            return user != null;
        }
    }
}