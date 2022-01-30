using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface ICourseRepository
    {
        Task<Course> GetCourseByTitleAsync(string title);
        Task<bool> IsCourseWithTitleAvailable(string title);
        Task AddCourseAsync(Course course);
    }
}