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
        public ITagsRepository TagsRepository => new TagsRepository(_context, _mapper);
        public ITutorialRepository TutorialRepository => new TutorialRepository(_context, _mapper);
        public ICourseRepository CourseRepository => new CourseRepository(_context, _mapper);
        public ISectionRepository SectionRepository => new SectionRepository(_context, _mapper);
        public ILectureRepository LectureRepository => new LectureRepository(_context, _mapper);
        public IPostRepository PostRepository => new PostRepository(_context, _mapper);
        public IMetaRepository MetaRepository => new MetaRepository(_context, _mapper);
        public IUserSessionRepository UserSessionRepository => new UserSessionRepository(_context, _mapper);
        public ILectureActivityRepository LectureActivityRepository => new LectureActivityRepository(_context, _mapper);
        public IStripeRepository StripeRepository => new StripeRepository(_mapper);

        public async Task<bool> CompleteAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }
    }
}