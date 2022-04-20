using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ITagsRepository
    {
        Task<PagedList<TagDto>> GetAllTags(TagParams tagParams);

        Task<IEnumerable<Tag>> SearchTags(string searchText);

        Task AddTag(Tag tag);
        Task<int> AddTags(IEnumerable<Tag> tags);

        Task<Tag> GetTagByIdAsync(int id);
        Task<Tag> GetTagByNameAsync(string tagName);
    }
}