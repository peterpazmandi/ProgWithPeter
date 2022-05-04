using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Stripe;
using Stripe.Checkout;

namespace API.Controllers
{
    public class PaymentsController: BaseApiController
    {
        private readonly IMapper _mapper;
        public PaymentsController(IMapper mapper)
        {
            StripeConfiguration.ApiKey = "sk_test_51GhfaYGHxfurHbhyTgs5osl2OMuYjnLLrcz6Po66vXgz5plVOqHOXO8xv7lCsJftCnJwfedRcwpkxWCBVDFsUiuE00SG4HuQI5";
            _mapper = mapper;
        }

        [HttpGet("Products")]
        public async Task<ActionResult> Products()
        {
            return await Task.Run(() => {
                ProductListOptions productListOptions = new ProductListOptions()
                {
                    Active = true
                };
                ProductService productService = new ProductService();
                List<Product> products = productService.List(productListOptions).ToList();

                List<MembershipDto> memberships = new List<MembershipDto>();
                foreach(Product product in products)
                {
                    PriceListOptions priceListOptions = new PriceListOptions()
                    {
                        Product = product.Id
                    };
                    PriceService priceService = new PriceService();
                    List<Price> prices = priceService.List(priceListOptions).ToList();
                    
                    MembershipDto membershipDto = _mapper.Map<MembershipDto>(product);
                    membershipDto.Prices = _mapper.Map<List<PriceDto>>(prices);

                    memberships.Add(membershipDto);
                };

                return Ok(memberships);
            });
        }

        

        [HttpPost("create-checkout-session")]
        public async Task<IActionResult> CreateCheckoutSession([FromBody] CreateCheckoutSessionDto req)
        {
			var options = new SessionCreateOptions
			{
				SuccessUrl = "https://localhost:4200/success",
				CancelUrl = "https://localhost:4200/failure",
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
					PublicKey = "sk_test_51GhfaYGHxfurHbhyTgs5osl2OMuYjnLLrcz6Po66vXgz5plVOqHOXO8xv7lCsJftCnJwfedRcwpkxWCBVDFsUiuE00SG4HuQI5"
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