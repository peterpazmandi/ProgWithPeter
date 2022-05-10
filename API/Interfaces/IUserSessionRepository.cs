using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserSessionRepository
    {
        Task AddSessionAsync(UserSession userSession);
        Task<UserSession> GetUserSessionAsync(AppUser appUser);
        void RemoveUserSession(UserSession userSession);
    }
}