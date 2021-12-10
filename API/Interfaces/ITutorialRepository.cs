using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface ITutorialRepository
    {
        Task AddTutorialAsync(Tutorial tutorial);
        void UpdateTutorial(Tutorial tutorial);
        Task<Tutorial> GetTutorialByTitleAsync(string title);
        Task<IEnumerable<Tutorial>> GetPublishedTutorialsOrderedByPublishDate();
        Task<Tutorial> GetTutorialById(int id);
    }
}