using Vypex.CodingChallenge.Domain.Models;
using Vypex.CodingChallenge.Infrastructure.Data;

namespace Vypex.CodingChallenge.Infrastructure.Repositories
{
    public class LeaveRepository : IRepository<Leave>
    {
        private readonly CodingChallengeContext _context;

        public LeaveRepository(CodingChallengeContext context) 
        {
            _context = context;
        }

        public Task<Leave> AddAsync(Leave entity)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<Leave> UpdateAsync(Leave entity)
        {
            throw new NotImplementedException();
        }
    }
}
