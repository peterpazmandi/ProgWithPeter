using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreateTutorialDto
    {
        public CreatePostDto Post { get; set; }

        public double Price { get; set; }
        public string Currency { get; set; }
    }
}