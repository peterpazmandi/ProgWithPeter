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

        [HttpGet("Products")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> Products()
        {
            try
            {
                return await Task.Run(() => {
                        ProductListOptions productListOptions = new ProductListOptions()
                        {
                            Active = true
                        };
                        ProductService productService = new ProductService();
                        List<Product> products = productService.List(productListOptions).OrderBy(p => p.Name).ToList();

                        List<MembershipDto> memberships = new List<MembershipDto>();
                        foreach(Product product in products)
                        {
                            PriceListOptions priceListOptions = new PriceListOptions()
                            {
                                Product = product.Id
                            };
                            PriceService priceService = new PriceService();
                            List<Price> prices = priceService.List(priceListOptions).OrderBy(p => p.Recurring.Interval).ToList();
                            
                            MembershipDto membershipDto = _mapper.Map<MembershipDto>(product);
                            membershipDto.Prices = _mapper.Map<List<PriceDto>>(prices);

                            memberships.Add(membershipDto);
                        };

                        return Ok(memberships);
                });
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("CreateCheckoutSession")]        
        [Authorize(Roles = "Admin, Moderator")]
        public async Task<IActionResult> CreateCheckoutSession([FromBody] CreateCheckoutSessionDto req)
        {
			var options = new SessionCreateOptions
			{
				SuccessUrl = req.SuccessUrl,
				CancelUrl = req.FailureUrl,
				PaymentMethodTypes = new List<string>
				{
					"card",
				},
				Mode = "subscription",
				LineItems = new List<SessionLineItemOptions>
				{
					new SessionLineItemOptions
					{
						Price = req.PriceId,
						Quantity = 1,
					},
				},
			};
            var service = new SessionService();
			service.Create(options);
            try
            {
				var session = await service.CreateAsync(options);
                
                if(await AddSessionAsync(session.Id))
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

        [HttpGet("GetAllCheckoutSessions")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllCheckoutSessions()
        {
            return await Task.Run(() => {
                SessionListOptions sessionListOptions = new SessionListOptions();

                SessionService sessionService = new SessionService();

                StripeList<Session> sessions = sessionService.List(sessionListOptions);

                return Ok(sessions);
            });
        }

        [HttpGet("GetCheckoutSession")]        
        [Authorize(Roles = "Admin, Moderator")]
        public async Task<IActionResult> GetCheckoutSession()
        {
            string username = User.GetUsername();
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

            UserSession userSession = await _unitOfWork.UserSessionRepository.GetUserSessionAsync(user);

            SessionService sessionService = new SessionService();

            try
            {
                return Ok(await sessionService.GetAsync(userSession.SessionId));
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

        [HttpGet("GetCheckoutSessionBySessionId")]        
        [Authorize(Roles = "Admin, Moderator")]
        public async Task<IActionResult> GetCheckoutSessionBySessionId(string sessionId)
        {
            SessionService sessionService = new SessionService();

            return Ok(await sessionService.GetAsync(sessionId));
        }

        [HttpGet("GetSubscriptionBySubscriptionId")]        
        [Authorize(Roles = "Admin, Moderator")]
        public async Task<IActionResult> GetSubscriptionBySubscriptionId(string subscriptionId)
        {
            SubscriptionService subscriptionService = new SubscriptionService();

            try
            {
                return await Task.Run(() => {
                    return Ok(subscriptionService.Get(subscriptionId));
                });
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
        





















        private async Task<bool> AddSessionAsync(string sessionId)
        {
            string username = User.GetUsername();
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

            UserSession userSession = await _unitOfWork.UserSessionRepository.GetUserSessionAsync(user);
            if(userSession != null)
            {
                userSession.SessionId = sessionId;
            }
            else
            {
                await _unitOfWork.UserSessionRepository.AddSessionAsync(new UserSession
                {
                    AppUser = user,
                    SessionId = sessionId
                });
            }

            return await _unitOfWork.Complete();
        }
    }
}