using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UpdateEmailDto
    {
        [Required]
        public string Email { get; set; }
        public string Password { get; set; }

        public string ClientURI { get; set; }
    }
}