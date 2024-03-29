using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UpsertPostDto
    {
        public int Id { get; set; }
        
        public string Title { get; set; }
        public string Excerpt { get; set; }        
        public string Content { get; set; }
        public string FeaturedImageUrl { get; set; }
        public string SourceCodeUrl { get; set; }
        public string Password { get; set; }
        public double Length { get; set; }

        
        public ICollection<int> TagIds { get; set; }
        public string CategoryName { get; set; }

        

        public CreateMetaDto Meta { get; set; }
    }
}