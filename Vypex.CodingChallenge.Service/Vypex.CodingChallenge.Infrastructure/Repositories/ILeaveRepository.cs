using Vypex.CodingChallenge.Domain.Models;

namespace Vypex.CodingChallenge.Infrastructure.Repositories
{
    public interface ILeaveRepository : IRepository<Leave>
    {
        Task<IEnumerable<Leave>> GetEmployeeLeavesAsync(Guid employeeId);
    }
}
