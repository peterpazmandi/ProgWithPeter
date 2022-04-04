using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UpsertLectureListDto
    {
        public int Id { get; set; }


        public string Status { get; set; }

        
        public DateTime? PublishDate { get; set; }
        public DateTime? ModificationDate { get; set; }

        public string CourseTitle { get; set; }


        public virtual UpsertPostListDto Post { get; set; }
    }
}