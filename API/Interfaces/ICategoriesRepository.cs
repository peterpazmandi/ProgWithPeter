using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface ICategoriesRepository
    {
        Task<IEnumerable<Category>> GetCategoriesByParentCategoryId(int? parentCategoryId = null);
        Task<Category> GetCategoryByIdAsync(int id);
        Task<Category> GetCategoryByNameAsync(string name);

    }
}