using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Stripe;
using Stripe.Checkout;

namespace API.Data
{
    public class StripeRepository: IStripeRepository
    {
        private readonly IMapper _mapper;

        public StripeRepository(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task<List<MembershipDto>> GetProductsAsync()
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

                return memberships;
            });
        }
    
        public async Task<Session> CreateCheckoutSession( CreateCheckoutSessionDto req)
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

            return await service.CreateAsync(options);
        }
    
        public async Task<StripeList<Session>> GetAllCheckoutSessions()
        {
            return await Task.Run(() => {
                SessionListOptions sessionListOptions = new SessionListOptions();

                SessionService sessionService = new SessionService();

                return sessionService.List(sessionListOptions);
            });
        }

        public async Task<Session> GetCheckoutSessionBySessionIdAsync(string sessionId)
        {
            SessionService sessionService = new SessionService();

            return await sessionService.GetAsync(sessionId);
        }

        public async Task<Subscription> GetSubscriptionBySubscriptionId(string subscriptionId)
        {
            return await Task.Run(() => {
                SubscriptionService subscriptionService = new SubscriptionService();
                return subscriptionService.Get(subscriptionId);
            });
        }
    }
}