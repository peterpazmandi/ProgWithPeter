using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Stripe;
using Stripe.Checkout;

namespace API.Controllers
{
    public class PaymentsController: BaseApiController
    {
        public PaymentsController()
        {
            StripeConfiguration.ApiKey = "sk_test_51GhfaYGHxfurHbhyTgs5osl2OMuYjnLLrcz6Po66vXgz5plVOqHOXO8xv7lCsJftCnJwfedRcwpkxWCBVDFsUiuE00SG4HuQI5";
        }

        [HttpGet("Products")]
        public async Task<ActionResult> Products()
        {
            var options = new ProductListOptions
            {
                Limit = 3,
            };
            var service = new ProductService();
            StripeList<Product> products = service.List(options);

            return Ok(products);
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