using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreateCheckoutSessionResponseDto
    {
		public string SessionId { get; set; }
		public string PublicKey { get; set; }
    }
}