using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class HomePageTutorialDto
    {
        public int Id { get; set; }
        public double Price { get; set; }
        public string Currency { get; set; }


        public DateTime PublishDate { get; set; }


        public HomePagePostDto Post { get; set; }
    }
}