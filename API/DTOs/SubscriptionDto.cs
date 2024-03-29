using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class SubscriptionDto
    {
        public string SubscriptionId { get; set; }
        public string MembershipType { get; set; }
        public double Price { get; set; }
        public DateTime CurrentPeriodStart { get; set; }
        public DateTime CurrentPeriodEnd { get; set; }
        public string Interval { get; set; }
        public string Mode { get; set; }
    }
}