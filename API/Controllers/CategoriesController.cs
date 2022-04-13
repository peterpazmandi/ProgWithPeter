using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CategoriesController: BaseApiController
    {        
        private readonly IUnitOfWork _unitOfWork;

        public CategoriesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("GetCategoriesByParentCategoryId")]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategoriesByParentCategoryId(int? parentCategoryId = null)
        {
            return Ok(await _unitOfWork.CategoriesRepository.GetCategoriesByParentCategoryId(parentCategoryId));
        }
    }
}