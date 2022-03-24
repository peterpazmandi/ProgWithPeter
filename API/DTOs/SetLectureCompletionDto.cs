using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class SetLectureCompletionDto
    {
        public int LectureId { get; set; }
        public bool IsCompleted { get; set; }
    }
}