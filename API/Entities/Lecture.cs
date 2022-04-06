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


        public string Status { get; set; }
        

        public virtual Section? Section { get; set; }



        public int PostId { get; set; }
        public virtual Post Post { get; set; }
        
        public DateTime? CreationDate { get; set; }
        public DateTime? ModificationDate { get; set; }


        public virtual List<LectureActivity> LectureActivities { get; set; }


        public int Position { get; set; }
    }
}