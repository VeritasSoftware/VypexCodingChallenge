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
        public async Task<IActionResult> Get() => Ok(await _employeeService.GetAllAsync());
            

        [HttpGet("{id}", Name = "GetEmployeeById")]
        public async Task<IActionResult> GetById(Guid id) => Ok(await _employeeService.GetByIdAsync(id));

        [HttpGet("search/{name}", Name = "Search")]
        public async Task<IActionResult> Search(string name) => Ok(await _employeeService.SearchAsync(name));

        [HttpGet("{employeeId}/leaves")]
        public async Task<IActionResult> GetEmployeeLeaves(Guid employeeId)
        {
            return Ok(await _employeeService.GetLeavesAsync(employeeId));
        }
    }
}
