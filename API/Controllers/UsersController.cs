using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Stripe;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UsersController(IWebHostEnvironment webHostEnvironment, IUnitOfWork unitOfWork, IMapper mapper, IConfiguration configuration)
        {
            _webHostEnvironment = webHostEnvironment;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _configuration = configuration;
        }

        [HttpGet("{username}", Name = "GetUser")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            return await _unitOfWork.UserRepository.GetMemberAsync(username);
        }

        [HttpPost("update-profile-photo")]
        public async Task<ActionResult<PhotoDto>> UpdateProfilePhoto(IFormFile file)
        {
            try
            {
                string username = User.GetUsername();
                var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

                FileInfo fileInfo = new FileInfo(file.FileName);
                var fileName = Guid.NewGuid().ToString() + fileInfo.Extension;
                var folderDirectory = $"\\Photos\\ProfilePhotos";
                var path = Path.Combine("Photos/ProfilePhotos", fileName);

                var memoryStream = new MemoryStream();
                await file.OpenReadStream().CopyToAsync(memoryStream);

                if (!Directory.Exists(folderDirectory))
                {
                    Directory.CreateDirectory(folderDirectory);
                }

                await using (var fs = new FileStream(path, FileMode.Create, FileAccess.Write))
                {
                    memoryStream.WriteTo(fs);
                }

                if(user.Photo != null)
                {
                    System.IO.File.Delete(Path.Combine("Photos/ProfilePhotos", user.Photo.Url));
                }

                var photo = new Photo
                {
                    Url = fileName
                };
                
                user.Photo = photo;

                if(await _unitOfWork.Complete())
                {
                    return CreatedAtRoute("GetUser", new {username = user.UserName}, _mapper.Map<PhotoDto>(photo));
                }

                return BadRequest("Problem adding photo");
            }
            catch(Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }
    
        [Authorize(Roles = "Admin, Moderator")]
        [HttpPost("UpdateCustomerId")]
        public async Task<ActionResult> UpdateCustomerId([FromForm]string customerId)
        {
            string username = User.GetUsername();
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

            user.StripeCustomerId = customerId;

            Subscription subscription = await _unitOfWork.StripeRepository.GetActiveSubscriptionOfCustomer(customerId);
            Product product = await _unitOfWork.StripeRepository.GetProductsAsync(subscription.Items.Data[0].Plan.ProductId);

            SubscriptionDto subscriptionDto = new SubscriptionDto
            {
                SubscriptionId = subscription.Id,
                MembershipType = product.Name,
                Price = Convert.ToDouble(subscription.Items.Data[0].Plan.Amount.Value) / 100,
                CurrentPeriodStart = subscription.CurrentPeriodStart,
                CurrentPeriodEnd = subscription.CurrentPeriodEnd,
                Interval = subscription.Items.Data[0].Plan.Interval,
                Mode = subscription.Object
            };

            if(!_unitOfWork.HasChanges())
            {
                return Ok(new {
                        isChanged = false,
                        subscription = subscriptionDto,
                        message = "The subscription is already saved!"
                    });
            }

            if (await _unitOfWork.Complete())
            {
                return Ok(new {
                        isChanged = true,
                        subscription = subscriptionDto,
                        message = $"Subscription added successfully to account: {username}"
                    });
            }

            return BadRequest("Operation failed!");
        }    
    }
}