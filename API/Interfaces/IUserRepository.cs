using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        Task<MemberDto> GetMemberAsync(string username);
        Task<IEnumerable<AppUser>> GerUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsernameAsync(string username);
        Task UpdateProfileDetailes(UpdateProfileDetailesDto updateProfileDetailesDto);
    }
}