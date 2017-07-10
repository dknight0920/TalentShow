using System;
using System.Collections.Generic;

namespace TalentShowWebApi.Models
{
    // Models returned by AccountController actions.

    public class ExternalLoginViewModel
    {
        public string Name { get; set; }

        public string Url { get; set; }

        public string State { get; set; }
    }

    public class ManageInfoViewModel
    {
        public string LocalLoginProvider { get; set; }

        public string Email { get; set; }

        public IEnumerable<UserLoginInfoViewModel> Logins { get; set; }

        public IEnumerable<ExternalLoginViewModel> ExternalLoginProviders { get; set; }
    }

    public class UserInfoViewModel
    {
        public string Id { get; set; }

        public string Email { get; set; }
        
        public IEnumerable<string> Roles { get; set; }

        public IEnumerable<UserClaimViewModel> Claims { get; set; }
    }

    public class UserClaimViewModel
    {
        public string Type { get; set; }
        public string Value { get; set; }
    }

    public class UserLoginInfoViewModel
    {
        public string LoginProvider { get; set; }

        public string ProviderKey { get; set; }
    }
}
