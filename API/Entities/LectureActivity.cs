using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class LectureActivity
    {
        public int Id { get; set; }

        public virtual Lecture Lecture { get; set; }
        public virtual AppUser AppUser { get; set; }

        public bool IsCompleted { get; set; }

        public DateTime? DateOfCompletion { get; set; }

    }
}