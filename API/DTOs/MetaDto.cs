using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class MetaDto
    {
        public int Id { get; set; }
        
        public string KeyPhrase { get; set; }
        public string SeoTitle { get; set; }
        public string Slug { get; set; }
        public string MetaDescription { get; set; }
    }
}