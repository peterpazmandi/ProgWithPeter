using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class TutorialRepository : ITutorialRepository
    {
        private readonly DataContext _context;

        public TutorialRepository(DataContext context)
        {
            _context = context;
        }

        public async Task AddTutorialAsync(Tutorial tutorial)
        {
            await _context.Tutorials.AddAsync(tutorial);
        }

        public void UpdateTutorial(Tutorial tutorial)
        {
            _context.Tutorials.Update(tutorial);
        }

        public async Task<Tutorial> GetTutorialByTitleAsync(string title)
        {
            return await _context.Tutorials
                .Where(t => t.Post.Title.ToLower().Equals(title.ToLower()))
                .FirstOrDefaultAsync();
        }

        public async Task<Tutorial> GetTutorialById(int id)
        {
            return await _context.Tutorials
                .Include(c => c.Post.Category)
                .Include(t => t.Post.Tags)
                .Include(m => m.Post.Meta)
                .Where(t => t.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Tutorial>> GetPublishedTutorialsOrderedByPublishDate()
        {
            return await _context.Tutorials
                .Include(c => c.Post.Category)
                .Include(t => t.Post.Tags)
                .Include(m => m.Post.Meta)
                .Include(u => u.Post.AppUser).Include(p => p.Post.AppUser.Photo)
                .Where(s => s.Status == PostStatus.Published.ToString())
                .OrderByDescending(p => p.PublishDate)
                .ToListAsync();
        }
    }
}