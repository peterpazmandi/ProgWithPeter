using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface ISectionRepository
    {
        Task<Section> GetSectionByTitleAsync(string title);

        Task<Section> AddSectionAsync(Section section);
    }
}