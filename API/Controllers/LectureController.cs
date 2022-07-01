using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LectureController: BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;



        public LectureController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [Authorize(Roles = "Admin, Moderator")]
        [HttpGet("GetLecturesOrderedByModificationDate")]
        public async Task<ActionResult<IEnumerable<UpsertLectureListDto>>> GetLecturesOrderedByModificationDate([FromQuery] LectureParams lectureParams)
        {
            var lectures = await _unitOfWork.LectureRepository.GetLecturesOrderedByModificationDate(lectureParams);

            foreach(var lecture in lectures)
            {
                lecture.CourseTitle = await _unitOfWork.CourseRepository.GetCourseTitleByLectureId(lecture.Id);
            }

            Response.AddPaginationHeader(lectures.CurrentPage, lectures.PageSize, lectures.TotalCount, lectures.TotalPages);

            return lectures;
        }

        [Authorize(Roles = "Admin, Moderator")]
        [HttpGet("FindLecturesByTitleWithoutParentSectionAlphabetically")]
        public async Task<ActionResult<IEnumerable<LectureTitleDto>>> FindLecturesByTitleWithoutParentSectionAlphabetically([FromQuery] LectureParams lectureParams)
        {
            var lectures = await _unitOfWork.LectureRepository.FindLecturesByTitleWithoutParentSectionAlphabetically(lectureParams);
            Response.AddPaginationHeader(
                lectures.CurrentPage,
                lectures.PageSize,
                lectures.TotalCount,
                lectures.TotalPages
            );

            return lectures;
        }

        [Authorize(Roles = "Admin, Moderator")]
        [HttpGet("FindLectures")]
        public async Task<ActionResult<IEnumerable<UpsertLectureListDto>>> FindLectures([FromQuery] LectureParams lectureParams)
        {
            var lectures = await _unitOfWork.LectureRepository.FindLectures(lectureParams);

            foreach(var lecture in lectures)
            {
                lecture.CourseTitle = await _unitOfWork.CourseRepository.GetCourseTitleByLectureId(lecture.Id);
            }

            Response.AddPaginationHeader(lectures.CurrentPage, lectures.PageSize, lectures.TotalCount, lectures.TotalPages);

            return lectures;
        }
        
        [Authorize(Roles = "Admin, Moderator")]
        [HttpGet("GetLectureByTitleAndCourseTitle")]
        public async Task<ActionResult<LectureDto>> GetLectureByTitleAndCourseTitle(string lectureTitle, string courseTitle)
        {
            if(string.IsNullOrEmpty(lectureTitle))
            {
                return BadRequest("Lecture's title is empty!");
            }
            if(string.IsNullOrEmpty(courseTitle))
            {
                return BadRequest("Course's title is empty!");
            }

            return await _unitOfWork.LectureRepository.GetLectureByTitleAndCourseTitle(lectureTitle, courseTitle);
        }

        [Authorize]
        [HttpPost("SetLectureCompletion")]
        public async Task<ActionResult<double>> SetLectureCompletion(SetLectureCompletionDto setLectureCompletionDto)
        {
            string username = User.GetUsername();
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

            var lecture = await _unitOfWork.LectureRepository.GetLectureById(setLectureCompletionDto.LectureId);

            if(lecture == null)
            {
                return NotFound($"Lecture with Id {setLectureCompletionDto.LectureId} not found!");
            }

            await _unitOfWork.LectureActivityRepository.SetLectureCompletion(lecture, user, setLectureCompletionDto.IsCompleted);


            if(!_unitOfWork.HasChanges())
            {
                return Ok(await _unitOfWork.CourseRepository.GetCourseProgressByLectureId(setLectureCompletionDto.LectureId, user.Id));
            }

            await _unitOfWork.CompleteAsync();

            double progress = await _unitOfWork.CourseRepository.GetCourseProgressByLectureId(setLectureCompletionDto.LectureId, user.Id);
            await _unitOfWork.CourseRepository.UpdateCourseProgressByLectureId(lecture.Id, user.Id, progress);

            if(await _unitOfWork.CompleteAsync())
            {
                return Ok(await _unitOfWork.CourseRepository.GetCourseProgressByLectureId(setLectureCompletionDto.LectureId, user.Id));
            }
            
            return BadRequest("Operation failed!");
        }
        
        [Authorize(Roles = "Admin, Moderator")]
        [HttpPost]
        public async Task<ActionResult> UpsertLecture(UpsertLectureDto lectureDto)
        {
            // Get author
            string username = User.GetUsername();
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

            // Get category
            var category = await _unitOfWork.CategoriesRepository.GetCategoryByNameAsync(lectureDto.Post.CategoryName);

            // Get tags
            ICollection<Tag> tags = new HashSet<Tag>();
            foreach(int tagId in lectureDto.Post.TagIds)
            {
                tags.Add(await _unitOfWork.TagsRepository.GetTagByIdAsync(tagId));
            }

            var lecture = new Lecture();

            if(lectureDto.Id == 0)
            {
                if(lectureDto.Status.Equals(PostStatus.Published.ToString())) 
                {
                    lecture.PublishDate = DateTime.Now;
                }

                lecture = new Lecture
                {
                    CreationDate = DateTime.Now,
                    ModificationDate = DateTime.Now,
                    Post = new Post
                    {
                        Title = lectureDto.Post.Title,
                        Excerpt = lectureDto.Post.Excerpt,
                        Content = lectureDto.Post.Content,
                        FeaturedImageUrl = lectureDto.Post.FeaturedImageUrl,
                        SourceCodeUrl = lectureDto.Post.SourceCodeUrl,
                        Password = lectureDto.Post.Password,
                        AppUser = user,
                        Category = category,
                        Tags = tags,
                        Meta = _mapper.Map<Meta>(lectureDto.Post.Meta)
                    },
                    Status = lectureDto.Status
                };

                await _unitOfWork.LectureRepository.AddLectureAsync(lecture);
            }
            else
            {
                // Update existing lecture
                lecture = await _unitOfWork.LectureRepository.GetLectureById(lectureDto.Id);

                if(lecture == null)
                {
                    return BadRequest($"Lecture with Id {lectureDto.Id} not found!");
                }

                lecture.Post.Title = lectureDto.Post.Title;
                lecture.Post.Excerpt = lectureDto.Post.Excerpt;
                lecture.Post.Content = lectureDto.Post.Content;
                lecture.Post.FeaturedImageUrl = lectureDto.Post.FeaturedImageUrl;
                lecture.Post.SourceCodeUrl = lectureDto.Post.SourceCodeUrl;
                lecture.Post.Password = lectureDto.Post.Password;
                lecture.Post.AppUser = user;
                lecture.ModificationDate = DateTime.Now;

                if(lectureDto.Status.Equals(PostStatus.Published.ToString())) 
                {
                    lecture.PublishDate = DateTime.Now;
                }

                lecture.Post.AppUser = user;

                lecture.Post.Category = category;

                lecture.Post.Tags = tags;

                if(lecture.Post.Meta == null)
                {
                    lecture.Post.Meta = _mapper.Map<Meta>(lectureDto.Post.Meta);
                }
                else
                {
                    lecture.Post.Meta.KeyPhrase = lectureDto.Post.Meta.KeyPhrase;
                    lecture.Post.Meta.SeoTitle = lectureDto.Post.Meta.SeoTitle;
                    lecture.Post.Meta.Slug = lectureDto.Post.Meta.Slug;
                    lecture.Post.Meta.MetaDescription = lectureDto.Post.Meta.MetaDescription;
                }

                lecture.Status = lectureDto.Status;
            }

            if(await _unitOfWork.CompleteAsync())
            {
                // Creation
                if(lectureDto.Id == 0)
                {
                    return Ok(new {
                        lecture = lecture,
                        lectureId = lecture.Id,
                        message = "Lecture has been created successfully!"
                    });
                }

                // Update
                    return Ok(new {
                        lectureId = lecture.Id,
                        message = "Lecture has been updated successfully!"
                    });
            }

            return BadRequest("Operation failed!");
        }
    }
}