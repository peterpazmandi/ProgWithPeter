using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class CategoriesRepository : ICategoriesRepository
    {
        private readonly DataContext _context;

        public CategoriesRepository(DataContext context)
        {
            _context = context;
        }

        public async Task AddCategory(Category category)
        {
            await _context.Categories.AddAsync(category);
        }

        public async Task<IEnumerable<Category>> GetCategoriesByParentCategoryId(int? parentCategoryId = null)
        {
            return await _context.Categories
                            .Where(cat => cat.ParentCategoryId == parentCategoryId)
                            .ToListAsync();
        }

        public async Task<Category> GetCategoryByIdAsync(int id)
        {
            return await _context.Categories
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task<Category> GetCategoryByNameAsync(string name)
        {
            return await _context.Categories
                .Where(x => x.Name.ToLower().Equals(name.ToLower()))
                .FirstOrDefaultAsync();
        }

        public async Task<Category> GetCategoryByNameAndParentCategoryIdAsync(CategoryDto categoryDto)
        {
            return await _context.Categories
                .Where(c => c.Name.ToLower().Equals(categoryDto.Name.ToLower())
                            && c.ParentCategoryId == categoryDto.ParentCategoryId)
                .FirstOrDefaultAsync();
        }
    }
}