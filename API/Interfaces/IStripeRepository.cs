using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using Stripe;
using Stripe.Checkout;

namespace API.Interfaces
{
    public interface IStripeRepository
    {
        Task<List<MembershipDto>> GetProductsAsync();
        Task<Session> CreateCheckoutSession( CreateCheckoutSessionDto req);
        Task<StripeList<Session>> GetAllCheckoutSessions();
        Task<Session> GetCheckoutSessionBySessionIdAsync(string sessionId);
        Task<Subscription> GetSubscriptionBySubscriptionId(string subscriptionId);
        Task<Product> GetProductsAsync(string productId);
    }
}