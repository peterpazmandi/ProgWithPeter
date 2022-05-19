using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
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


        public string FeaturedImageUrl { get; set; }
        public string SourceCodeUrl { get; set; }


        public int? MetaId { get; set; }
        [JsonIgnore]
        public virtual Meta Meta { get; set; }


        public int? AppUserId { get; set; }
        [JsonIgnore]
        public AppUser AppUser {get;set;}



        public string Password { get; set; }
        public long? Length { get; set; }


        public virtual Course Course { get; set; }
        public virtual Tutorial Tutorial { get; set; }
        public virtual Lecture Lecture { get; set; }


        public virtual ICollection<Tag> Tags { get; set; }


        public int? CategoryId { get; set; }
        [JsonIgnore]
        public virtual Category Category { get; set; }
    }
}