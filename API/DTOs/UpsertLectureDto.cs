using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UpsertLectureDto
    {
        public UpsertPostOfLectureDto Post { get; set; }


        public int Position { get; set; }
    }
}