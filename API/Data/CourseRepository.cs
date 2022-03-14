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

        public Task<Course> GetCourseByTitleAsync(string title, int? appUserId)
        {
            var query = _context.Courses
                .Include(c => c.Post).ThenInclude(p => p.AppUser)
                .Include(c => c.Post).ThenInclude(p => p.Meta)
                .Include(c => c.Post).ThenInclude(p => p.Tags)
                .Include(c => c.Post).ThenInclude(p => p.Category)
                .Include(c => c.Sections)
                    .ThenInclude(s => s.Lectures)
                    .ThenInclude(l => l.Post)
                    .ThenInclude(p => p.Meta)
                .Include(c => c.Sections)
                    .ThenInclude(s => s.Lectures)
                    .ThenInclude(l => l.LectureActivities.Where(le => le.AppUser.Id == appUserId)).ThenInclude(le => le.AppUser)
                .Include(c => c.Sections)
                    .ThenInclude(s => s.Lectures)
                    .ThenInclude(l => l.Post)
                    .ThenInclude(p => p.Tags)
                .Include(c => c.CourseEnrollments.Where(ce => ce.AppUser.Id == appUserId)).ThenInclude(ce => ce.AppUser)
                .Where(c => c.Post.Title.ToLower().Equals(title.ToLower()));
                
                    
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

        public async Task<PagedList<HomePageCourseDto>> GetPublishedCoursesOrderedByPublishDate(CourseParams courseParams)
        {
            var query = _context.Courses
                .Include(c => c.Post)
                .OrderByDescending(c => c.PublishDate)
                .Where(c => c.Status == PostStatus.Published.ToString());

            var queryDto = await _mapper.ProjectTo<HomePageCourseDto>(query).ToListAsync();
            if(courseParams.AppUserId != null)
            {
                for(int i = 0; i < queryDto.Count(); i++)
                {
                    queryDto[i].CourseEnrollments.RemoveAll(x => x.AppUserId != courseParams.AppUserId);
                }
            }
            
            return await PagedList<HomePageCourseDto>
                .CreateAsync(queryDto.AsQueryable(), courseParams.PageNumber, courseParams.PageSize);
        }

        public async Task<bool> IsCourseWithTitleAvailable(string title)
        {
            return (await _context.Courses
                .Where(t => t.Post.Title.ToLower().Equals(title.ToLower()))
                .FirstOrDefaultAsync()) != null;
        }
    }
}