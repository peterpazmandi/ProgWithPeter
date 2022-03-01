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
    public class LectureRepository : ILectureRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public LectureRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Lecture> AddLectureAsync(Lecture lecture)
        {
            return (await _context.Lectures.AddAsync(lecture)).Entity;
        }

        

        public async Task<PagedList<LectureTitleDto>> FindLecturesByTitleWithoutParentSectionAlphabetically(LectureParams lectureParams)
        {
            var query = _context.Lectures
                        .Include(l => l.Post)
                        .Include(l => l.Section)
                        .Where(l => l.Section == null)
                        .AsQueryable();
            
            if(!string.IsNullOrEmpty(lectureParams.Title))
            {
                query = query.Where(l => l.Post.Title.ToLower().Contains(lectureParams.Title.ToLower()));
            }

            query = query.OrderBy(l => l.Post.Title);
            
            return await PagedList<LectureTitleDto>.CreateAsync(
                query.ProjectTo<LectureTitleDto>(_mapper.ConfigurationProvider).AsNoTracking(), 
                lectureParams.PageNumber, 
                lectureParams.PageSize);
        }
    }
}