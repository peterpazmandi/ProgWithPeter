using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class LectureParams : PaginationParams
    {
        public string Title { get; set; }
    }
}