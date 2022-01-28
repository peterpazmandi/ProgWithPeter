using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
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

            return Ok();
        }
    }
}