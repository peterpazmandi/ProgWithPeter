using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    }
}