using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Lecture
    {
        [Key]
        public int Id { get; set; }



        public virtual ICollection<Section> Sections { get; set; }



        public int PostId { get; set; }
        public virtual Post Post { get; set; }


        public int Position { get; set; }
    }
}