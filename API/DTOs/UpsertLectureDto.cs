using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UpsertLectureDto
    {
        public int Id { get; set; }


        public UpsertPostDto Post { get; set; }

        public string Status { get; set; }


        public int Position { get; set; }
    }
}