using System;
using TalentShow.Repos;

namespace TalentShow.Services
{
    public class UserService
    {
        private readonly IInUse UserInUse;

        public UserService(IInUse userInUse)
        {
            if (userInUse == null)
                throw new ApplicationException("A UserService cannot be constructed without an userInUse.");

            UserInUse = userInUse;
        }

        public bool InUse(string userId)
        {
            return UserInUse.InUse(userId);
        }
    }
}
