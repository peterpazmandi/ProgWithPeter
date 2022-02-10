using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        ICategoriesRepository CategoriesRepository { get; }
        ITagsRepository TagsRepository { get; }
        ITutorialRepository TutorialRepository { get; }
        ICourseRepository CourseRepository { get; }
        ISectionRepository SectionRepository { get; }
        ILectureRepository LectureRepository { get; }

        Task<bool> Complete();
        bool HasChanges();
    }
}