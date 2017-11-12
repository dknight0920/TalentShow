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

namespace TalentShowWeb.Account.Util
{
    public class AccountUtil
    {
        private ApplicationUserManager manager;
        private HttpContext context;

        public AccountUtil(HttpContext Context)
        {
            context = Context;
            manager = Context.GetOwinContext().GetUserManager<ApplicationUserManager>();
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
    }
}