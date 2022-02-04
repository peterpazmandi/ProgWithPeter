using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UpsertPostListDto
    {
        public string Title { get; set; }
        

        public ICollection<TagDto> Tags { get; set; }
        
        public CategoryDto Category { get; set; }
    }
}