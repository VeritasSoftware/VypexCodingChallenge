using Vypex.CodingChallenge.Domain.PresentationModels;

namespace Vypex.CodingChallenge.Infrastructure.Business
{
    public interface ILeaveService
    {
        Task<LeaveModel> AddAsync(LeaveModel leaveModel);
        Task<LeaveModel> UpdateAsync(LeaveModel leaveModel);
        Task DeleteAsync(Guid id);
    }
}