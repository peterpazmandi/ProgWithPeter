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
        Task<UserSession> GetUserSession(UserSessionDto userSessionDto);
        void RemoveUserSession(UserSession userSession);
    }
}