using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;

namespace API.Controllers
{
    public class PaymentsController: BaseApiController
    {
		private readonly StripeSettings _stripeSettings;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public PaymentsController(IOptions<StripeSettings> stripeSettings, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _stripeSettings = stripeSettings.Value;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("Products")]
        public async Task<ActionResult> Products()
        {
            try
            {
                return await Task.Run(async () => {
                        return Ok(await _unitOfWork.StripeRepository.GetProductsAsync());
                });
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
      
        [Authorize(Roles = "Admin, Moderator")]
        [HttpPost("CreateCheckoutSession")]  
        public async Task<IActionResult> CreateCheckoutSession([FromBody] CreateCheckoutSessionDto req)
        {
            try
            {
                Session session = await _unitOfWork.StripeRepository.CreateCheckoutSession(req);
                
                string username = User.GetUsername();
                var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

                UserSession userSession = await _unitOfWork.UserSessionRepository.GetUserSessionAsync(user);
                if(userSession != null)
                {
                    userSession.SessionId = session.Id;
                }
                else
                {
                    await _unitOfWork.UserSessionRepository.AddSessionAsync(new UserSession
                    {
                        AppUser = user,
                        SessionId = session.Id
                    });
                }
            
                if(await _unitOfWork.Complete())
                {
                    return Ok(new CreateCheckoutSessionResponseDto
                    {
                        SessionId = session.Id,
                        PublicKey = _stripeSettings.PublicKey
                    });
                }

                return BadRequest("Operation failed!");
            }
            catch (StripeException e)
            {
                Console.WriteLine(e.StripeError.Message);
                return BadRequest(e.StripeError.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("GetAllCheckoutSessions")]
        public async Task<IActionResult> GetAllCheckoutSessions()
        {
            return Ok(await _unitOfWork.StripeRepository.GetAllCheckoutSessions());
        }

        [Authorize(Roles = "Admin, Moderator")]
        [HttpGet("GetCheckoutSession")]
        public async Task<IActionResult> GetCheckoutSession()
        {
            try
            {
                string username = User.GetUsername();
                var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

                UserSession userSession = await _unitOfWork.UserSessionRepository.GetUserSessionAsync(user);

                return Ok(await _unitOfWork.StripeRepository.GetCheckoutSessionBySessionIdAsync(userSession.SessionId));
            }
            catch (StripeException stripeException)
            {
                return BadRequest(stripeException.Message);
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }
        
        [Authorize(Roles = "Admin, Moderator")]
        [HttpGet("GetCheckoutSessionBySessionId")]
        public async Task<IActionResult> GetCheckoutSessionBySessionId(string sessionId)
        {
            return Ok(await _unitOfWork.StripeRepository.GetCheckoutSessionBySessionIdAsync(sessionId));
        }
       
        [Authorize(Roles = "Admin, Moderator")]
        [HttpGet("GetSubscriptionBySubscriptionId")] 
        public async Task<IActionResult> GetSubscriptionBySubscriptionId(string subscriptionId)
        {
            try
            {
                return Ok(await _unitOfWork.StripeRepository.GetSubscriptionBySubscriptionId(subscriptionId));
            }
            catch (StripeException stripeException)
            {
                return BadRequest(stripeException.Message);
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }
    }
}