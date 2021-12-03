using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;

namespace API.Data
{
    public class TutorialRepository : ITutorialRepository
    {
        private readonly DataContext _context;

        public TutorialRepository(DataContext context)
        {
            _context = context;
        }

        public async Task AddTutorial(Tutorial tutorial)
        {
            await _context.Tutorials.AddAsync(tutorial);
        }
    }
}