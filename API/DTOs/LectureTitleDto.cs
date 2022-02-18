using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class LectureTitleDto
    {
        public int Id { get; set; }
        public PostTitleDto Post { get; set; }
    }
}