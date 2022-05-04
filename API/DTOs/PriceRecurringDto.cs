using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class PriceRecurringDto
    {
        public string Interval { get; set; }
        public long IntervalCount { get; set; }
        public long? TrialPeriodDays { get; set; }
        public string UsageType { get; set; }
    }
}