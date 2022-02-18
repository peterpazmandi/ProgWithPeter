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
    public class CourseRepository : ICourseRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;


        public CourseRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task AddCourseAsync(Course course)
        {
            await _context.Courses.AddAsync(course);
        }

        public Task<Course> GetCourseByIdAsync(int id)
        {
            var query = _context.Courses
                .Include(c => c.Post).ThenInclude(p => p.AppUser)
                .Include(c => c.Post).ThenInclude(p => p.Meta)
                .Include(c => c.Post).ThenInclude(p => p.Tags)
                .Include(c => c.Sections)
                    .ThenInclude(s => s.Lectures)
                    .ThenInclude(l => l.Post)
                    .ThenInclude(p => p.Meta)
                .Include(c => c.Sections)
                    .ThenInclude(s => s.Lectures)
                    .ThenInclude(l => l.Post)
                    .ThenInclude(p => p.Tags)
                .Where(c => c.Id == id);
                    
            return query
                .FirstOrDefaultAsync();
        }

        public Task<Course> GetCourseByTitleAsync(string title)
        {
            var query = _context.Courses
                .Include(c => c.Post).ThenInclude(p => p.AppUser)
                .Include(c => c.Post).ThenInclude(p => p.Meta)
                .Include(c => c.Post).ThenInclude(p => p.Tags)
                .Include(c => c.Sections)
                    .ThenInclude(s => s.Lectures)
                    .ThenInclude(l => l.Post)
                    .ThenInclude(p => p.Meta)
                .Include(c => c.Sections)
                    .ThenInclude(s => s.Lectures)
                    .ThenInclude(l => l.Post)
                    .ThenInclude(p => p.Tags)
                .Where(c => c.Post.Title.Equals(title));
                    
            return query
                .FirstOrDefaultAsync();
        }

        public async Task<PagedList<UpsertCourseListDto>> GetCoursesOrderedByModificationDate(CourseParams courseParams)
        {
            var query = _context.Courses
                .Include(c => c.Post.Category)
                .Include(t => t.Post.Tags)
                .OrderByDescending(p => p.ModificationDate)
                .ProjectTo<UpsertCourseListDto>(_mapper.ConfigurationProvider);

            return await PagedList<UpsertCourseListDto>
                .CreateAsync(query, courseParams.PageNumber, courseParams.PageSize);
        }

        public async Task<bool> IsCourseWithTitleAvailable(string title)
        {
            return (await _context.Courses
                .Where(t => t.Post.Title.ToLower().Equals(title.ToLower()))
                .FirstOrDefaultAsync()) != null;
        }
    }
}