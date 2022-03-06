using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Course
    {
        [Key]
        public int Id { get; set; }


        public string Status { get; set; }


        public double Price { get; set; }
        public string Currency { get; set; }


        public DateTime CreationDate { get; set; }
        public DateTime ModificationDate { get; set; }
        public DateTime PublishDate { get; set; }


        public int PostId { get; set; }
        public virtual Post Post { get; set; }


        public virtual List<Section> Sections { get; set; }


        public virtual List<CourseEnrollment> CourseEnrollments { get; set; }
    }
}