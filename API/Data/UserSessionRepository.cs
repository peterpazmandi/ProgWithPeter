using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserSessionRepository: IUserSessionRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserSessionRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task AddSessionAsync(UserSession userSession)
        {
            await _context.UserSessions.AddAsync(userSession);
        }

        public async Task<UserSession> GetUserSession(UserSessionDto userSessionDto)
        {
            return await _context.UserSessions.FirstOrDefaultAsync(x => 
                x.AppUserId == userSessionDto.AppUserId
                && x.SessionId.Equals(userSessionDto.SessionId)
                );
        }

        public void RemoveUserSession(UserSession userSession)
        {
            _context.UserSessions.Remove(userSession);
        }
    }
}