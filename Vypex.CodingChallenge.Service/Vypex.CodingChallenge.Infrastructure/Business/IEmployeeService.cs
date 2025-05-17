using Vypex.CodingChallenge.Domain.PresentationModels;

namespace Vypex.CodingChallenge.Infrastructure.Business
{
    public interface IEmployeeService
    {
        Task<IEnumerable<EmployeeModel>> GetAllAsync();
        Task<EmployeeModel?> GetByIdAsync(Guid id);
        Task<IEnumerable<EmployeeModel>> SearchAsync(string name);
    }
}