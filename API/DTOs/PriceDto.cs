using System;

namespace API.DTOs
{
    public class PriceDto
    {
        public string Id { get; set; }
        public string Type { get; set; }
        public PriceRecurringDto Recurring { get; set; }
        public string Nickname { get; set; }
        public string Currency { get; set; }
        public DateTime Created { get; set; }
        public string BillingScheme { get; set; }
        public bool Active { get; set; }
        public long? UnitAmount { get; set; }
        public decimal? UnitAmountDecimal { get; set; }
    }
}