using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
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
        [HttpPost("SetLectureCompletion")]
        public async Task<ActionResult<double>> SetLectureCompletion(int lectureId, bool isCompleted)
        {
            string username = User.GetUsername();
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

            var lecture = await _unitOfWork.LectureRepository.FindLectureById(lectureId);

            if(lecture == null)
            {
                return NotFound($"Lecture with Id {lectureId} not found!");
            }

            await _unitOfWork.LectureActivityRepository.SetLectureCompletion(lecture, user, isCompleted);

            if(await _unitOfWork.Complete())
            {
                return Ok(await _unitOfWork.CourseRepository.GetCourseProgressByLectureId(lectureId, user.Id));
            }
            
            return BadRequest("Operation failed!");
        }
    }
}