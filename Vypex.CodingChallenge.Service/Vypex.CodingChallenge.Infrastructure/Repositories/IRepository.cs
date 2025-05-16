namespace Vypex.CodingChallenge.Infrastructure.Repositories
{
    public interface IRepository<TEntity>
    {
        Task<TEntity> AddAsync (TEntity entity);
        Task<TEntity> UpdateAsync (TEntity entity);
        Task DeleteAsync (Guid id);
    }
}
