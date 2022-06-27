using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CategoriesController: BaseApiController
    {        
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CategoriesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [Authorize(Roles = "Admin, Moderator")]
        [HttpGet("GetCategoriesByParentCategoryId")]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategoriesByParentCategoryId(int? parentCategoryId = null)
        {
            return Ok(await _unitOfWork.CategoriesRepository.GetCategoriesByParentCategoryId(parentCategoryId));
        }

        [Authorize(Roles = "Admin, Moderator")]
        [HttpPost("UpsertCategory")]
        public async Task<ActionResult> UpsertCategory(CategoryDto categoryDto)
        {
            if(categoryDto == null)
            {
                return BadRequest("Please provide a valid category!");
            }
            if(string.IsNullOrEmpty(categoryDto.Name))
            {
                return BadRequest("Category name can't be empty!");
            }
            if(await _unitOfWork.CategoriesRepository.GetCategoryByNameAndParentCategoryIdAsync(categoryDto) != null)
            {
                return BadRequest("This category name already exists under this parent category!");
            }

            Category category = null;
            if(categoryDto.Id == 0)
            {
                category = _mapper.Map<Category>(categoryDto);
                await _unitOfWork.CategoriesRepository.AddCategory(category);
            }
            else
            {
                category = await _unitOfWork.CategoriesRepository.GetCategoryByIdAsync(categoryDto.Id);
                category.Name = categoryDto.Name;
                category.ParentCategoryId = categoryDto.ParentCategoryId;
            }

            if(await _unitOfWork.CompleteAsync())
            {
                // Creation
                if(categoryDto.Id == 0)
                {
                    return Ok(new {
                        category = category,
                        message = "Category has been created successfully!"
                    });
                }

                // Update
                    return Ok(new {
                        category = category,
                        message = "Category has been updated successfully!"
                    });
            }

            return BadRequest("Operation failed!");
        }
    }
}