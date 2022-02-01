using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;
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
            return _context.Courses
                .Include(c => c.Post)
                .Include(c => c.Post.AppUser)
                .Include(c => c.Post.Meta)
                .FirstOrDefaultAsync();
        }

        public Task<Course> GetCourseByTitleAsync(string title)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> IsCourseWithTitleAvailable(string title)
        {
            return (await _context.Courses
                .Where(t => t.Post.Title.ToLower().Equals(title.ToLower()))
                .FirstOrDefaultAsync()) != null;
        }
    }
}