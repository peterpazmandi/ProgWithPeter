using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Post
    {
        [Key]
        public int Id { get; set; }


        public string Title { get; set; }
        public string Excerpt { get; set; }        
        [MaxLength]
        public string Content { get; set; }


        public int MetaId { get; set; }
        public Meta Meta { get; set; }


        public DateTime CreationDate { get; set; }
        public DateTime ModificationDate { get; set; }


        public int AppUserId { get; set; }
        public AppUser AppUser {get;set;}


        public string Status { get; set; }
        public string Password { get; set; }
        public long Length { get; set; }
    }
}