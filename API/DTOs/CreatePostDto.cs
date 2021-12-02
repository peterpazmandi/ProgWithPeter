using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreatePostDto
    {
        public string Title { get; set; }
        public string Excerpt { get; set; }        
        public string Content { get; set; }
        public string Password { get; set; }
        public long Length { get; set; }

        
        public ICollection<TagDto> Tags { get; set; }
        public CategoryDto Category { get; set; }

        

        public CreateMetaDto Meta { get; set; }
    }
}