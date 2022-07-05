using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UserCourseEnrollmentDto
    {
        public string CourseTitle { get; set; }
        public double Progress { get; set; }
        public string Slug { get; set; }
    }
}