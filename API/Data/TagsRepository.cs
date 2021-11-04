using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class TagsRepository : ITagsRepository
    {
        private readonly DataContext _context;

        public TagsRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<int> AddTags(IEnumerable<Tag> tags)
        {
            int inserted = 0;

            foreach(Tag tag in tags)
            {
                bool tagExists = (await _context.Tags
                    .Where(t => t.Name.ToLower().Contains(tag.Name.ToLower()))
                    .ToListAsync())
                    .Count() > 0;

                if(!tagExists)
                {
                    await _context.Tags.AddAsync(tag);
                    inserted++;
                }
            }

            return inserted;
        }

        public async Task<IEnumerable<Tag>> SearchTags(string searchText)
        {
            return await _context.Tags
                .Where(t => t.Name.ToLower().Contains(searchText.ToLower()))
                .ToListAsync();
        }
    }
}