using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class Client
    {
        public string EmailConfirmationUri { get; set; }
        public string ResetPasswordUri { get; set; }
    }
}