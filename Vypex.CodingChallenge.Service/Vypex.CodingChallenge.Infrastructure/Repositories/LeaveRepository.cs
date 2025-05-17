using Vypex.CodingChallenge.Domain.Models;
using Vypex.CodingChallenge.Infrastructure.Data;

namespace Vypex.CodingChallenge.Infrastructure.Repositories
{
    public class LeaveRepository : ILeaveRepository
    {
        private readonly CodingChallengeContext _context;

        public LeaveRepository(CodingChallengeContext context) 
        {
            _context = context;
        }

        public async Task<Leave> AddAsync(Leave entity)
        {
            await _context.Leaves.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task DeleteAsync(Guid id)
        {
            var leave = await _context.Leaves.FindAsync(id);

            if (leave != null)
            {
                _context.Leaves.Remove(leave);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Leave> UpdateAsync(Leave entity)
        {
            _context.Leaves.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}
