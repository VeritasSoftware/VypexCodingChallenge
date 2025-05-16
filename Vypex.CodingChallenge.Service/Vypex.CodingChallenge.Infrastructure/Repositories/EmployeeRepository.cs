using Microsoft.EntityFrameworkCore;
using Vypex.CodingChallenge.Domain.Models;
using Vypex.CodingChallenge.Infrastructure.Data;

namespace Vypex.CodingChallenge.Infrastructure.Repositories
{
    public class EmployeeRepository : IEmployeeRepository, IRepository<Employee>
    {
        private readonly CodingChallengeContext _context;

        public EmployeeRepository(CodingChallengeContext context) 
        {
            _context = context;
        }

        public async Task<Employee> AddAsync(Employee entity)
        {
            await _context.Employees.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task DeleteAsync(Guid id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee != null)
            {
                _context.Employees.Remove(employee);
                await _context.SaveChangesAsync();
            }
        }        

        public async Task<Employee> UpdateAsync(Employee entity)
        {
            _context.Employees.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<IEnumerable<Employee>> SearchAsync(string name)
        {
            return await _context.Employees.Where(x => x.Name == name).ToListAsync();
        }
    }
}
