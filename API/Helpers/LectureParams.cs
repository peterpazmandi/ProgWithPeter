using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class LectureParams : PaginationParams
    {
        public string Title { get; set; }
        public string CourseTitle { get; set; }
        public string Status { get; set; }
        public string CategoryName { get; set; }
    }
}