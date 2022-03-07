using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CourseEnrollmentDto
    {
        public int Id { get; set; }

        public int CourseId { get; set; }

        public DateTime EnrollDate { get; set; }

        public double Progress { get; set; }
    }
}