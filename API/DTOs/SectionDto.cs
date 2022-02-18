using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class SectionDto
    {
        public int Id { get; set; }

        public List<LectureDto> Lectures { get; set; }
        public string Title { get; set; }
        public int Position { get; set; }
    }
}