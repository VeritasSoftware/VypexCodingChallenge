using Vypex.CodingChallenge.Domain.Models;
using Vypex.CodingChallenge.Domain.PresentationModels;
using Vypex.CodingChallenge.Infrastructure.Repositories;

namespace Vypex.CodingChallenge.Infrastructure.Business
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IMapperService _mapperService;

        public EmployeeService(IEmployeeRepository employeeRepository, IMapperService mapper)
        {
            _employeeRepository = employeeRepository;
            _mapperService = mapper;
        }

        public async Task<IEnumerable<EmployeeModel>> GetAllAsync()
        {
            var employees = await _employeeRepository.GetAllAsync();

            if (employees == null)
            {
                return Enumerable.Empty<EmployeeModel>();
            }

            return _mapperService.Map<Employee, EmployeeModel>(employees);
        }

        public async Task<EmployeeModel?> GetByIdAsync(Guid id)
        {
            var employee = await _employeeRepository.GetByIdAsync(id);

            if (employee == null)
            {
                return null;
            }

            return _mapperService.Map<Employee, EmployeeModel>(employee);
        }
    }
}
