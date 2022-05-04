using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class MembershipDto
    {
        public string Name { get; set; }
        public DateTime Updated { get; set; }
        public string Description { get; set; }
        public bool? Deleted { get; set; }
        public List<string> DeactivateOn { get; set; }
        public DateTime Created { get; set; }
        public bool Active { get; set; }
        public string Object { get; set; }
        public string Id { get; set; }
        public List<string> Images { get; set; }

        public List<PriceDto> Prices { get; set; }
    }
}