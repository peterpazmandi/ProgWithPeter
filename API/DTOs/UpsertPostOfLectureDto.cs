using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UpsertPostOfLectureDto
    {        
        public string Title { get; set; }

        public CreateMetaDto Meta { get; set; }
    }
}