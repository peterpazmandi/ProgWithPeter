using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class CourseEnrollment
    {
        public int Id { get; set; }

        public virtual Course Course { get; set; }
        public virtual AppUser AppUser { get; set; }

        public DateTime EnrollDate { get; set; }

        public double Progress { get; set; }
    }
}