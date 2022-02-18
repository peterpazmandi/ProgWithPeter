using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class LectureDto
    {
        public int Id { get; set; }

        public PostDto Post { get; set; }
        public int Position { get; set; }
    }
}