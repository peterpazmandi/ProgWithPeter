using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Meta
    {
        [Key]
        public int Id { get; set; }

        public string KeyPhrase { get; set; }
        public string SeoTitle { get; set; }
        public string Slug { get; set; }
        public string MetaDescription { get; set; }

        public virtual Post Post { get; set; }
    }
}