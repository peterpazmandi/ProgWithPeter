using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface ITagsRepository
    {
        Task<IEnumerable<Tag>> SearchTags(string searchText);

        Task<int> AddTags(IEnumerable<Tag> tags);

        Task<Tag> GetTagByIdAsync(int id);
    }
}