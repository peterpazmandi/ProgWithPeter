using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Helpers;
using AutoMapper;
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
        private readonly IMapper _mapper;
        public PaymentsController(IOptions<StripeSettings> stripeSettings, IMapper mapper)
        {
			_stripeSettings = stripeSettings.Value;
            _mapper = mapper;
        }

        [HttpGet("Products")]
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
				return Ok(new CreateCheckoutSessionResponseDto
				{
					SessionId = session.Id,
					PublicKey = _stripeSettings.PublicKey
				});
            }
            catch (StripeException e)
            {
                Console.WriteLine(e.StripeError.Message);
                return BadRequest(e.StripeError.Message);
            }
        }
    }
}