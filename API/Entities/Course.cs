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


        public double Price { get; set; }
        public string Currency { get; set; }        


        public int PostId { get; set; }
        public virtual Post Post { get; set; }
    }
}