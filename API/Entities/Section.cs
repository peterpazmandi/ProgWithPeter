using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Section
    {
        [Key]
        public int Id { get; set; }


        public virtual ICollection<Course> Courses { get; set; }
        public virtual ICollection<Lecture> Lectures { get; set; }


        
        public string Title { get; set; }


        public int Position { get; set; }
    }
}