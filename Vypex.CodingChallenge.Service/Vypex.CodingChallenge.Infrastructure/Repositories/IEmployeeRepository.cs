using Vypex.CodingChallenge.Domain.Models;

namespace Vypex.CodingChallenge.Infrastructure.Repositories
{
    public interface IEmployeeRepository : IRepository<Employee>
    {
        Task<Employee?> GetByIdAsync(Guid employeeId);
        Task<IEnumerable<Employee>> GetAllAsync();
        Task<IEnumerable<Employee>> SearchAsync(string name);
        Task<IEnumerable<Leave>> GetLeavesAsync(Guid employeeId);
    }
}
