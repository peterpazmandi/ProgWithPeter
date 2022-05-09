using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreateCheckoutSessionDto
    {
		[Required]
		public string PriceId { get; set; }
		[Required]
		public string SuccessUrl { get; set; }
		[Required]
		public string FailureUrl { get; set; }
    }
}