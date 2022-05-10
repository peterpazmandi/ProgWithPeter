using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UserSessionDto
    {
        public int AppUserId { get; set; }
        public string SessionId { get; set; }
    }
}