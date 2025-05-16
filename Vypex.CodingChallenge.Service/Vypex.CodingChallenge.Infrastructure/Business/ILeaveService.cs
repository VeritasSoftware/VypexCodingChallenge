using Vypex.CodingChallenge.Domain.PresentationModels;

namespace Vypex.CodingChallenge.Infrastructure.Business
{
    public interface ILeaveService
    {
        Task<LeaveModel> AddAsync(LeaveModel leaveModel);
    }
}