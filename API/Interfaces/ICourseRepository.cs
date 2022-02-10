using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ICourseRepository
    {
        Task<Course> GetCourseByTitleAsync(string title);
        Task<Course> GetCourseByIdAsync(int id);
        Task<bool> IsCourseWithTitleAvailable(string title);
        Task AddCourseAsync(Course course);
        Task<PagedList<UpsertCourseListDto>> GetCoursesOrderedByModificationDate(CourseParams courseParams);
        
    }
}