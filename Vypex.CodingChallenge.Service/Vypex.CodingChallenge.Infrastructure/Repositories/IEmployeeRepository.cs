using Vypex.CodingChallenge.Domain.Models;

namespace Vypex.CodingChallenge.Infrastructure.Repositories
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> SearchAsync(string name);
    }
}
