using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class HomePagePostDto
    {
        public string Title { get; set; }
        public string Excerpt { get; set; }
        
        public string FeaturedImageUrl { get; set; }
        
        public HomePageMetaDto Meta { get; set; }

        public ICollection<TagDto> Tags { get; set; }
        
        public CategoryDto Category { get; set; }
    }
}