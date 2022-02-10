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
    public class CourseController: PostController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CourseController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }



        [Authorize(Roles = "Admin, Moderator")]
        [HttpGet("GetCoursesOrderedByModificationDate")]
        public async Task<ActionResult<IEnumerable<UpsertCourseListDto>>> GetCoursesOrderedByModificationDate([FromQuery] CourseParams courseParams)
        {
            var courses = await _unitOfWork.CourseRepository.GetCoursesOrderedByModificationDate(courseParams);

            Response.AddPaginationHeader(courses.CurrentPage, courses.PageSize, courses.TotalCount, courses.TotalPages);

            return courses;
        }


        [Authorize(Roles = "Admin, Moderator")]
        [HttpPost]
        public async Task<ActionResult> UpsertCourse(UpsertCourseDto upsertCourseDto)
        {
            if(upsertCourseDto.Id == 0)
            {
                if(await _unitOfWork.CourseRepository.IsCourseWithTitleAvailable(upsertCourseDto.Post.Title))
                {
                    return BadRequest("A course with this title already exists!");
                }
            }

            // Get author
            string username = User.GetUsername();
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

            // Get category
            var category = await _unitOfWork.CategoriesRepository.GetCategoryByNameAsync(upsertCourseDto.Post.CategoryName);

            // Get tags
            ICollection<Tag> courseTags = new HashSet<Tag>();
            foreach(int tagId in upsertCourseDto.Post.TagIds)
            {
                courseTags.Add(await _unitOfWork.TagsRepository.GetTagByIdAsync(tagId));
            }

            Course course = null;

            if(upsertCourseDto.Id == 0)
            {
                course = _mapper.Map<Course>(upsertCourseDto);
                if(upsertCourseDto.Status.Equals(PostStatus.Published.ToString()))
                {
                    course.PublishDate = DateTime.UtcNow;
                }

                course.CreationDate = DateTime.UtcNow;
                course.ModificationDate = DateTime.UtcNow;

                course.Post.Tags = courseTags;
                course.Post.Category = category;
                course.Post.AppUser = user;

                foreach(Section section in course.Sections)
                {
                    foreach(Lecture lecture in section.Lectures)
                    {
                        lecture.Post.AppUser = user;
                    }
                }

                await _unitOfWork.CourseRepository.AddCourseAsync(course);
            }
            else
            {
                course = await _unitOfWork.CourseRepository.GetCourseByIdAsync(upsertCourseDto.Id);
                // //_mapper.Map(upsertCourseDto, course);

                course.ModificationDate = DateTime.UtcNow;
                
                course.Post.Title = upsertCourseDto.Post.Title;
                course.Post.Tags = courseTags;
                course.Post.Category = category;
                course.Post.AppUser = user;
                
                List<Section> sections = _mapper.Map<List<Section>>(upsertCourseDto.Sections);
                for(int i = 0; i < upsertCourseDto.Sections.Count(); i++)
                {
                    if(upsertCourseDto.Sections[i].Id != 0)
                    {
                        course.Sections[i].Title = upsertCourseDto.Sections[i].Title;
                        course.Sections[i].Position = upsertCourseDto.Sections[i].Position;
                        for(int j = 0; j < course.Sections[i].Lectures.Count(); j++)
                        {
                            if(course.Sections[i].Lectures.ToList()[j].Id != 0)
                            {
                                _mapper.Map(upsertCourseDto.Sections[i].Lectures.ToList()[j], course.Sections[i].Lectures.ToList()[j]);
                            }
                            else
                            {
                                Lecture lecture = await _unitOfWork.LectureRepository.AddLectureAsync(sections[i].Lectures.ToList()[j]);
                                course.Sections[i].Lectures.Add(lecture);
                            }
                        }
                    }
                    else
                    {
                        Section section = await _unitOfWork.SectionRepository.AddSectionAsync(sections[i]);
                        // await _unitOfWork.Complete();
                        course.Sections.Add(section);
                    }
                }
                //course.Sections = sections;

                // for (int i = 0; i < course.Sections.Count(); i++)
                // {
                //     if(course.Sections.ToList()[i].Id != 0)
                //     {
                //         course.Sections.ToList()[i].Title = upsertCourseDto.Sections.ToList()[i].Title;
                //         course.Sections.ToList()[i].Position = upsertCourseDto.Sections.ToList()[i].Position;
                //         for(int j = 0; j < course.Sections.ToList()[i].Lectures.Count(); j++)
                //         {
                //             _mapper.Map(upsertCourseDto.Sections.ToList()[i].Lectures.ToList()[j], course.Sections.ToList()[i].Lectures.ToList()[j]);
                //         }
                //     }
                //     else
                //     {

                //     }
                //     //_mapper.Map(upsertCourseDto.Sections.ToList()[i], course.Sections.ToList()[i]);
                // }

                // if(upsertCourseDto.Sections.Count() > course.Sections.Count())
                // {

                // }
                // else if (upsertCourseDto.Sections.Count() < course.Sections.Count())
                // {

                // }
                // else
                // {
                    
                // }

                if(upsertCourseDto.Status.Equals(PostStatus.Published.ToString()))
                {
                    course.PublishDate = DateTime.UtcNow;
                }
            }

            if(await _unitOfWork.Complete())
            {
                // Creation
                if(upsertCourseDto.Id == 0)
                {
                    return Ok(new {
                        course = course,
                        courseId = course.Id,
                        message = "Course has been created successfully!"
                    });
                }

                // Update
                    return Ok(new {
                        courseId = course.Id,
                        message = "Course has been updated successfully!"
                    });
            }
            return BadRequest("Operation failed!");
        }
    }
}