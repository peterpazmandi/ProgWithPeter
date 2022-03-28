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
        public async Task<ActionResult<double>> SetLectureCompletion(SetLectureCompletionDto setLectureCompletionDto)
        {
            string username = User.GetUsername();
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

            var lecture = await _unitOfWork.LectureRepository.FindLectureById(setLectureCompletionDto.LectureId);

            if(lecture == null)
            {
                return NotFound($"Lecture with Id {setLectureCompletionDto.LectureId} not found!");
            }

            await _unitOfWork.LectureActivityRepository.SetLectureCompletion(lecture, user, setLectureCompletionDto.IsCompleted);


            if(!_unitOfWork.HasChanges())
            {
                return Ok(await _unitOfWork.CourseRepository.GetCourseProgressByLectureId(setLectureCompletionDto.LectureId, user.Id));
            }

            await _unitOfWork.Complete();

            double progress = await _unitOfWork.CourseRepository.GetCourseProgressByLectureId(setLectureCompletionDto.LectureId, user.Id);
            await _unitOfWork.CourseRepository.UpdateCourseProgressByLectureId(lecture.Id, user.Id, progress);

            if(await _unitOfWork.Complete())
            {
                return Ok(await _unitOfWork.CourseRepository.GetCourseProgressByLectureId(setLectureCompletionDto.LectureId, user.Id));
            }
            
            return BadRequest("Operation failed!");
        }
    }
}