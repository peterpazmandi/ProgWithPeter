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
            ICollection<Tag> tags = new HashSet<Tag>();
            foreach(int tagId in upsertCourseDto.Post.TagIds)
            {
                tags.Add(await _unitOfWork.TagsRepository.GetTagByIdAsync(tagId));
            }

            Course course = _mapper.Map<Course>(upsertCourseDto);

            if(upsertCourseDto.Id == null)
            {
                if(upsertCourseDto.Status.Equals(PostStatus.Published.ToString()))
                {
                    course.PublishDate = DateTime.UtcNow;
                }

                course.CreationDate = DateTime.UtcNow;
                course.ModificationDate = DateTime.UtcNow;

                course.Post.Tags = tags;
                course.Post.Category = category;
                course.Post.AppUser = user;

                //await _unitOfWork.CourseRepository.AddCourseAsync(course);
            }
            else
            {

            }

            // if(await _unitOfWork.Complete())
            // {
            //     // Creation
            //     if(upsertCourseDto.Id == 0)
            //     {
            //         return Ok(new {
            //             tutorialId = course.Id,
            //             message = "Course has been created successfully!"
            //         });
            //     }

            //     // Update
            //         return Ok(new {
            //             tutorialId = upsertCourseDto.Id,
            //             message = "Course has been updated successfully!"
            //         });
            // }

            return Ok(course);
            return BadRequest("Operation failed!");
        }
    }
}