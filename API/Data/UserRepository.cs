using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<AppUser>> GerUsersAsync()
        {
            return await _context.Users
                            .Include(u => u.Photo)
                            .ToListAsync();
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users
                            .Include(u => u.Photo)
                            .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await _context.Users
                            .Include(u => u.Photo)
                            .Where(x => x.UserName == username)
                            .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                            .SingleOrDefaultAsync();
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                            .Include(p => p.Photo)
                            .OrderBy(x => x.UserName)
                            .SingleOrDefaultAsync(x => x.UserName == username);
        }
    }
}