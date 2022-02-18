using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CourseDto
    {
        public int Id { get; set; }


        public string Status { get; set; }


        public double Price { get; set; }
        public string Currency { get; set; }


        public DateTime CreationDate { get; set; }
        public DateTime ModificationDate { get; set; }
        public DateTime PublishDate { get; set; }


        public int PostId { get; set; }
        public PostDto Post { get; set; }

        public List<SectionDto> Sections { get; set; }
    }
}