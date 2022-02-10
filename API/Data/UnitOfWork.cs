using System.Threading.Tasks;
using API.Interfaces;
using AutoMapper;

namespace API.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UnitOfWork(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }



        public IUserRepository UserRepository => new UserRepository(_context, _mapper);
        public ICategoriesRepository CategoriesRepository => new CategoriesRepository(_context);
        public ITagsRepository TagsRepository => new TagsRepository(_context);
        public ITutorialRepository TutorialRepository => new TutorialRepository(_context, _mapper);
        public ICourseRepository CourseRepository => new CourseRepository(_context, _mapper);
        public ISectionRepository SectionRepository => new SectionRepository(_context, _mapper);

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }
    }
}