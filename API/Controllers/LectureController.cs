using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
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
    }
}