using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        ICategoriesRepository CategoriesRepository { get; }
        ITagsRepository TagsRepository { get; }

        Task<bool> Complete();
        bool HasChanges();
    }
}