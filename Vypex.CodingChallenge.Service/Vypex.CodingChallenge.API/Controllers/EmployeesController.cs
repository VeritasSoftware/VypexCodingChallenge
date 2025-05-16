using Microsoft.AspNetCore.Mvc;
using Vypex.CodingChallenge.Domain.PresentationModels;
using Vypex.CodingChallenge.Infrastructure.Business;

namespace Vypex.CodingChallenge.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeesController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet(Name = "GetEmployees")]
        public async Task<IEnumerable<EmployeeModel>> Get() => await _employeeService.GetAllAsync();
            

        [HttpGet("{id}", Name = "GetEmployeeById")]
        public async Task<EmployeeModel?> GetById(Guid id) => await _employeeService.GetByIdAsync(id);
    }
}
