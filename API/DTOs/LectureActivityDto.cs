using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class LectureActivityDto
    {
        public int Id { get; set; }

        public bool IsCompleted { get; set; }

        public DateTime DateOfCompletion { get; set; }
    }
}