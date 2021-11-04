using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TagsController: BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        public TagsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
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
                if(await _unitOfWork.Complete())
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
    }
}