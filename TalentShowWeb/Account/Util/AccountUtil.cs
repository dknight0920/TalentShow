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
        private const string ADMIN = "Admin";
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
            return IsUserInRole(ADMIN, context.User.Identity.GetUserId());
        }

        public bool IsUserAnAdmin(string userId)
        {
            return IsUserInRole(ADMIN, userId);
        }
      
        public bool IsUserInRole(string roleName, string userId)
        {
            var role = roleManager.Roles.FirstOrDefault(r => r.Name == roleName);

            if (role == null) return false;
            
            var user = role.Users.FirstOrDefault(u => u.UserId == userId);

            return user != null;
        }

        public void SetEmail(string userId, string Email)
        {
            manager.SetEmail(userId, Email);
        }

        public void SetUserName(string userId, string userName)
        {
            
        }

        public void AddToAdminRole(string userId)
        {
            if (IsUserInRole(ADMIN, userId)) return;

            manager.AddToRole(userId, ADMIN);
        }

        public void RemoveFromAdminRole(string userId)
        {
            if (!IsUserInRole(ADMIN, userId)) return;

            manager.RemoveFromRole(userId, ADMIN);
        }

        public void DeleteUser(string userId)
        {
            manager.Delete(GetUser(userId));
        }
    }
}