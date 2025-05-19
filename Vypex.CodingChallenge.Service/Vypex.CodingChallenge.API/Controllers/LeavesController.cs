using Microsoft.AspNetCore.Mvc;
using Vypex.CodingChallenge.Domain.PresentationModels;
using Vypex.CodingChallenge.Infrastructure.Business;

namespace Vypex.CodingChallenge.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeavesController : ControllerBase
    {
        private readonly ILeaveService _leaveService;

        public LeavesController(ILeaveService leaveService) 
        {
            _leaveService = leaveService;
        }

        [HttpGet("{employeeId}")]
        public async Task<IActionResult> GetEmployeeLeaves(Guid employeeId)
        {
            return Ok(await _leaveService.GetEmployeeLeavesAsync(employeeId));
        }

        [HttpPost]
        public async Task<IActionResult> Add(LeaveModel model)
        {
            return Ok(await _leaveService.AddAsync(model));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, LeaveModel model)
        {
            model.Id = id;
            return Ok(await _leaveService.UpdateAsync(model));
        }

        [HttpDelete("{id}")]
        public async Task Delete(Guid id)
        {
            await _leaveService.DeleteAsync(id);
        }
    }
}
