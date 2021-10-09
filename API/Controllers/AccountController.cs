using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using EmailService;
using System.Linq;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IEmailSender _emailSender;
        private readonly IConfiguration _config;

        public Client Client { get; set; }

        public AccountController(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            ITokenService tokenService,
            IMapper mapper,
            IUnitOfWork unitOfWork,
            IEmailSender emailSender,
            IConfiguration config)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _emailSender = emailSender;
            _config = config;

            Client = _config
                .GetSection("Client")
                .Get<Client>();
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(await UserExists(registerDto.Username))
            {
                return BadRequest("Username is already taken!");
            }

            var user = _mapper.Map<AppUser>(registerDto);

            user.UserName = registerDto.Username.ToLower();

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if(!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var param = new Dictionary<string, string>
            {
                {"token", token },
                {"email", user.Email }
            };
            var callback = QueryHelpers.AddQueryString(Client.EmailConfirmationUri, param);
            var message = new Message(new string[] { user.Email }, "Email Confirmation token", callback, null);
            await _emailSender.SendEmailAsync(message);

            var rolesResults = await _userManager.AddToRoleAsync(user, "Member");

            if(!rolesResults.Succeeded) return BadRequest(result.Errors);

            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                FirstName = user.FirstName,
                LastName = user.LastName
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
                .Include(p => p.Photo)
                .SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if(user == null)
            {
                return Unauthorized("Invalid username!");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if(!result.Succeeded)
            {
                return Unauthorized();
            }

            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhotoUrl = "https://localhost:5001/ProfilePhotos/" + user.Photo.Url
            };
        }

        [HttpGet("email-confirmation")]
        public async Task<ActionResult> EmailConfirmation([FromQuery] string email, [FromQuery] string token)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if(user == null)
            {
                return BadRequest("Invalid email confirmation request");
            }

            var confirmResult = await _userManager.ConfirmEmailAsync(user, token);

            if(!confirmResult.Succeeded)
            {
                return BadRequest("Email confirmation failed!");
            }

            return Ok();
        }

        [HttpPost("forgot-password")]
        public async Task<ActionResult> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
        {
            var user = await _userManager.FindByEmailAsync(forgotPasswordDto.Email);
            if(user is null)
            {
                return BadRequest("Invalid request!");
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var param = new Dictionary<string, string>
            {
                { "token", token },
                { "email", forgotPasswordDto.Email }
            };
            var callback = QueryHelpers.AddQueryString(Client.ResetPasswordUri, param);
            var message = new Message(new string[] { forgotPasswordDto.Email}, "Reset password token", callback, null);
            await _emailSender.SendEmailAsync(message);

            return Ok();
        }

        [HttpPost("reset-password")]
        public async Task<ActionResult> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
        {
            var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);
            if(user is null)
            {
                return BadRequest("Invalid request!");
            }

            var resetPassResult = await _userManager.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.Password);
            if(!resetPassResult.Succeeded)
            {
                var errors = resetPassResult.Errors.Select(e => e.Description);
                return BadRequest(new { Errors = errors });
            }

            return Ok();
        }

        [Authorize]
        [HttpPost("update-user-password")]   
        public async Task<ActionResult> UpdateUserPassword(UpdatePasswordDto updatePasswordDto)     
        {
            string username = User.GetUsername();
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

            var validateUser = await _signInManager.CheckPasswordSignInAsync(user, updatePasswordDto.CurrentPassword, false);
            if(!validateUser.Succeeded)
            {
                return Unauthorized();
            }

            var result = await _userManager.ChangePasswordAsync(user, updatePasswordDto.CurrentPassword, updatePasswordDto.NewPassword);

            if(!result.Succeeded)
            {
                return BadRequest("Failed to update password!");
            }

            return NoContent();
        }

        [Authorize]
        [HttpPost("update-user-email")]
        public async Task<ActionResult> UpdateUserEmail(UpdateEmailDto updateEmailDto)
        {
            string username = User.GetUsername();
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

            var validateUser = await _signInManager.CheckPasswordSignInAsync(user, updateEmailDto.Password, false);
            if(!validateUser.Succeeded)
            {
                return Unauthorized();
            }

            user.Email = updateEmailDto.Email;
            user.EmailConfirmed = false;

            var result = await _userManager.UpdateAsync(user);

            if(!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var param = new Dictionary<string, string>
            {
                {"token", token },
                {"email", user.Email }
            };
            var callback = QueryHelpers.AddQueryString(updateEmailDto.ClientURI, param);
            var message = new Message(new string[] { user.Email }, "Email Confirmation token", callback, null);
            await _emailSender.SendEmailAsync(message);

            return Ok();
        }

        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}