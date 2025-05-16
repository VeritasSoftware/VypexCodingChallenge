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

        [HttpPost]
        public async Task<LeaveModel> Add(LeaveModel model)
        {
            return await _leaveService.AddAsync(model);
        }
    }
}
