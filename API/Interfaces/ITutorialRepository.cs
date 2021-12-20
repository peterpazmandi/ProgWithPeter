using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ITutorialRepository
    {
        Task AddTutorialAsync(Tutorial tutorial);
        void UpdateTutorial(Tutorial tutorial);
        Task<Tutorial> GetTutorialByTitleAsync(string title);
        Task<PagedList<HomePageTutorialDto>> GetPublishedTutorialsOrderedByPublishDate(TutorialParams tutorialParams);
        Task<Tutorial> GetTutorialById(int id);
    }
}