using System;
using System.Collections;
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
    public class TagsController: BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public TagsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [Authorize(Roles = "Admin, Moderator")]
        [HttpGet("GetAllTags")]
        public async Task<ActionResult<IEnumerable<TagDto>>> GetAllTags([FromQuery] TagParams tagsParams)
        {
            PagedList<TagDto> tags = await _unitOfWork.TagsRepository.GetAllTags(tagsParams);

            Response.AddPaginationHeader(
                tags.CurrentPage,
                tags.PageSize,
                tags.TotalCount,
                tags.TotalPages
            );

            return tags;
        }

        [HttpGet("SearchTags")]
        public async Task<ActionResult<IEnumerable<Tag>>> SearchTags(string searchText)
        {
            if(string.IsNullOrEmpty(searchText))
            {
                return BadRequest("Search text has to be at least 1 charachter long.");
            }
            return Ok(await _unitOfWork.TagsRepository.SearchTags(searchText));
        }

        [HttpPost("AddTags")]
        public async Task<ActionResult> AddTags(IEnumerable<Tag> tags)
        {
            if(tags.Count() == 0)
            {
                return BadRequest("The provided list is empty!");
            }

            int insertedTagsCount =  await _unitOfWork.TagsRepository.AddTags(tags);

            if(insertedTagsCount > 0)
            {
                if(await _unitOfWork.CompleteAsync())
                {
                    return Ok($"{insertedTagsCount} Tags added successfully.");
                }
            }
            else
            {
                return Ok("No tags are inserted.");
            }

            return BadRequest("Faild to add tags!");
        }

        [Authorize(Roles = "Admin, Moderator")]
        [HttpPost("UpsertTag")]
        public async Task<ActionResult> UpsertTag(TagDto tagDto)
        {
            if(string.IsNullOrEmpty(tagDto.Name))
            {
                return BadRequest("Tag name can't be empty!");
            }

            if(await _unitOfWork.TagsRepository.GetTagByNameAsync(tagDto.Name) != null)
            {
                return BadRequest("This tag name already exists!");
            }

            Tag tag = null;
            if(tagDto.Id == 0)
            {
                tag = _mapper.Map<Tag>(tagDto);
                await _unitOfWork.TagsRepository.AddTag(tag);
            }
            else
            {
                tag = await _unitOfWork.TagsRepository.GetTagByIdAsync(tagDto.Id);
                tag.Name = tagDto.Name;
            }

            if(await _unitOfWork.CompleteAsync())
            {
                // Creation
                if(tagDto.Id == 0)
                {
                    return Ok(new {
                        tag = tag,
                        message = "Tag has been created successfully!"
                    });
                }

                // Update
                return Ok(new {
                    tag = tag,
                    message = "Tag has been updated successfully!"
                });
            }

            return BadRequest("Operation failed!");
        }
    }
}