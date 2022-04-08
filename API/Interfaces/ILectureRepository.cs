using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ILectureRepository
    {
        Task<PagedList<UpsertLectureListDto>> GetLecturesOrderedByModificationDate(LectureParams lectureParams);
        Task<Lecture> AddLectureAsync(Lecture lecture);
        Task<Lecture> FindLectureById(int id);
        Task<LectureDto> GetLectureByTitleAndCourseTitle(string lectureTitle, string courseTitle);
        Task<PagedList<LectureTitleDto>> FindLecturesByTitleWithoutParentSectionAlphabetically(LectureParams lectureParams);
        Task<PagedList<UpsertLectureListDto>> FindLectures(LectureParams lectureParams);
    }
}