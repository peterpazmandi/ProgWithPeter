using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ICategoriesRepository
    {
        Task AddCategory(Category category);
        Task<IEnumerable<Category>> GetCategoriesByParentCategoryId(int? parentCategoryId = null);
        Task<Category> GetCategoryByIdAsync(int id);
        Task<Category> GetCategoryByNameAsync(string name);
        Task<Category> GetCategoryByNameAndParentCategoryIdAsync(CategoryDto categoryDto);
    }
}