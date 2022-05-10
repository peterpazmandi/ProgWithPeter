using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Entities
{
    public class UserSession
    {
        public int Id { get; set; }


        public int AppUserId { get; set; }
        [JsonIgnore]
        public AppUser AppUser {get;set;}

        public string SessionId { get; set; }
    }
}