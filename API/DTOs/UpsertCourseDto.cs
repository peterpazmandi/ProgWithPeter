using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UpsertCourseDto
    {
        public int Id { get; set; }

        public UpsertPostDto Post { get; set; }

        //public ICollection<UpsertSectionsDto> Sections { get; set; }

        public string Status { get; set; }

        public double Price { get; set; }
        public string Currency { get; set; }
    }
}