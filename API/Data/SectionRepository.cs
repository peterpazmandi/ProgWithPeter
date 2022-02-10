using System;
using System.Collections.Generic;
using API.Entities;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class SectionRepository: ISectionRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public SectionRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Section> AddSectionAsync(Section section)
        {
            return (await _context.Sections
                .AddAsync(section)).Entity;
        }

        public async Task<Section> GetSectionByTitleAsync(string title)
        {
            return await _context.Sections
            .Include(s => s.Lectures)
            .Where(s => s.Title.ToLower().Equals(title.ToLower()))
            .FirstOrDefaultAsync();
        }
    }
}