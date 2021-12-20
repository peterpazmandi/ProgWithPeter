using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class HomePageTutorialDto
    {
        public double Price { get; set; }
        public string Currency { get; set; }


        public DateTime PublishDate { get; set; }


        public virtual HomePagePostDto Post { get; set; }
    }
}