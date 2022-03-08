using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class HomePageCourseDto
    {
        public DateTime PublishDate { get; set; }

        public virtual HomePagePostDto Post { get; set; }

        public List<CourseEnrollmentDto> CourseEnrollments { get; set; }
    }
}