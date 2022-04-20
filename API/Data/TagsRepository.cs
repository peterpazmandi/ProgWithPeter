using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class TagsRepository : ITagsRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public TagsRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PagedList<TagDto>> GetAllTags(TagParams tagParams)
        {
            var query = _context.Tags
                .ProjectTo<TagDto>(_mapper.ConfigurationProvider)
                .OrderBy(t => t.Name);

            return await PagedList<TagDto>.CreateAsync(query, tagParams.PageNumber, tagParams.PageSize);
        }

        public async Task AddTag(Tag tag)
        {
            await _context.Tags.AddAsync(tag);
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

        public async Task<Tag> GetTagByIdAsync(int id)
        {
            return await _context.Tags
                .Where(t => t.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task<Tag> GetTagByNameAsync(string tagName)
        {
            return await _context.Tags
                .Where(t => t.Name.ToLower().Equals(tagName.ToLower()))
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Tag>> SearchTags(string searchText)
        {
            return await _context.Tags
                .Where(t => t.Name.ToLower().Contains(searchText.ToLower()))
                .ToListAsync();
        }
    }
}