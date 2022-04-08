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

        public async Task<PagedList<UpsertLectureListDto>> GetLecturesOrderedByModificationDate(LectureParams lectureParams)
        {
            var query = _context.Lectures
                .Include(c => c.Post.Category)
                .Include(t => t.Post.Tags)
                .OrderByDescending(p => p.ModificationDate)
                .ProjectTo<UpsertLectureListDto>(_mapper.ConfigurationProvider);

            return await PagedList<UpsertLectureListDto>
                .CreateAsync(query, lectureParams.PageNumber, lectureParams.PageSize);
        }

        public async Task<PagedList<UpsertLectureListDto>> FindLectures(LectureParams lectureParams)
        {
            var query = _context.Courses
                .Include(c => c.Sections)
                .Include(c => c.Sections)
                    .ThenInclude(s => s.Lectures)
                .Include(c => c.Sections)
                    .ThenInclude(s => s.Lectures)
                        .ThenInclude(l => l.Post)
                .Include(c => c.Sections)
                    .ThenInclude(s => s.Lectures)
                        .ThenInclude(l => l.Post)
                            .ThenInclude(p => p.Category)
                .Include(c => c.Post)
                .Where(c => 
                    c.Post.Title.ToLower().Contains(string.IsNullOrEmpty(lectureParams.CourseTitle) ? "" : lectureParams.CourseTitle.ToLower()))
                .SelectMany(c => c.Sections
                    .SelectMany(s => s.Lectures
                                        .Where(l => l.Post.Title.ToLower().Contains(string.IsNullOrEmpty(lectureParams.Title) ? "" : lectureParams.Title.ToLower())
                                                    && ((l.Post.Category != null) ? l.Post.Category.Name.Contains(string.IsNullOrEmpty(lectureParams.CategoryName) ? "" : lectureParams.CategoryName) : true)
                                                    && (string.IsNullOrEmpty(l.Status) ? true : l.Status.Contains(string.IsNullOrEmpty(lectureParams.Status) ? "" : lectureParams.Status))
                                               )
                                )
                            )
                .ProjectTo<UpsertLectureListDto>(_mapper.ConfigurationProvider);

            return await PagedList<UpsertLectureListDto>
                .CreateAsync(query, lectureParams.PageNumber, lectureParams.PageSize);
        }

        public async Task<Lecture> AddLectureAsync(Lecture lecture)
        {
            return (await _context.Lectures.AddAsync(lecture)).Entity;
        }

        public async Task<Lecture> FindLectureById(int id)
        {
            return await _context.Lectures.SingleOrDefaultAsync(l => l.Id == id);
        }

        public async Task<LectureDto> GetLectureByTitleAndCourseTitle(string lectureTitle, string courseTitle)
        {
            var lecture = await _context.Courses
                .Include(c => c.Post)
                .Include(c => c.Sections).ThenInclude(s => s.Lectures).ThenInclude(l => l.Post)
                .Where(c => c.Post.Title.ToLower().Equals(courseTitle.ToLower()))
                .SelectMany(c => c.Sections
                    .SelectMany(s => s.Lectures.Where(l => l.Post.Title.ToLower().Equals(lectureTitle.ToLower()))))
                .FirstOrDefaultAsync();

            return _mapper.Map<LectureDto>(lecture);
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