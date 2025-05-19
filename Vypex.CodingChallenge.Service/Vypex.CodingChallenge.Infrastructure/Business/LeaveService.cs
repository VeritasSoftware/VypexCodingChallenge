using Vypex.CodingChallenge.Domain.Models;
using Vypex.CodingChallenge.Domain.PresentationModels;
using Vypex.CodingChallenge.Infrastructure.Repositories;

namespace Vypex.CodingChallenge.Infrastructure.Business
{
    public class LeaveService : ILeaveService
    {
        private readonly ILeaveRepository _leaveRepository;
        private readonly IMapperService _mapperService;

        public LeaveService(ILeaveRepository repository, IMapperService mapperService)
        {
            _leaveRepository = repository;
            _mapperService = mapperService;
        }        

        public async Task<LeaveModel> AddAsync(LeaveModel leaveModel)
        {
            var leave = _mapperService.Map<LeaveModel, Leave>(leaveModel);
            leave = await _leaveRepository.AddAsync(leave);
            return _mapperService.Map<Leave, LeaveModel>(leave);
        }

        public async Task<LeaveModel> UpdateAsync(LeaveModel leaveModel)
        {
            var leave = _mapperService.Map<LeaveModel, Leave>(leaveModel);
            leave = await _leaveRepository.UpdateAsync(leave);
            return _mapperService.Map<Leave, LeaveModel>(leave);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _leaveRepository.DeleteAsync(id);
        }

    }
}
