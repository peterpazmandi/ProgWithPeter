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
        Task<Course> GetCourseByTitleAsync(string title, int? appUserId);
        Task<Course> GetCourseByIdAsync(int id);
        Task<string> GetCourseTitleByLectureId(int lectureId);
        Task<double> GetCourseProgressByLectureId(int lectureId, int appUserId);
        Task<List<UserCourseEnrollment>> GetEnrolledCoursesByUserId(int userId);
        Task<bool> IsCourseWithTitleAvailable(string title);
        Task AddCourseAsync(Course course);
        Task UpdateCourseProgressByLectureId(int lectureId, int appUserId, double progress);
        Task<PagedList<HomePageCourseDto>> GetPublishedCoursesOrderedByPublishDate(CourseParams courseParams);
        Task<PagedList<UpsertCourseListDto>> GetCoursesOrderedByModificationDate(CourseParams courseParams);
        Task<List<string>> GetCourseTitles();
        
    }
}