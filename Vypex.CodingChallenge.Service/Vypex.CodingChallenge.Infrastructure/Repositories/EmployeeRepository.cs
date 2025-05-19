using Microsoft.EntityFrameworkCore;
using Vypex.CodingChallenge.Domain.Models;
using Vypex.CodingChallenge.Infrastructure.Data;

namespace Vypex.CodingChallenge.Infrastructure.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
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

        public async Task<Employee> UpdateAsync(Employee entity)
        {
            _context.Employees.Update(entity);
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

        public async Task<IEnumerable<Employee>> SearchAsync(string name)
        {
            return await _context.Employees
                                 .Include(e => e.Leaves)
                                 .Where(x => x.Name.ToLower().Contains(name.ToLower()))
                                 .ToListAsync();
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _context.Employees
                                 .Include(e => e.Leaves)
                                 .ToListAsync();
        }

        public async Task<Employee?> GetByIdAsync(Guid employeeId)
        {
            return await _context.Employees
                                 .Include(e => e.Leaves)
                                 .FirstOrDefaultAsync(e => e.Id == employeeId);
        }

        public async Task<IEnumerable<Leave>> GetLeavesAsync(Guid employeeId)
        {
            var employee = await _context.Employees
                                 .Include(e => e.Leaves)
                                 .SingleOrDefaultAsync(e => e.Id == employeeId);

            if (employee == null)
            {
                return Enumerable.Empty<Leave>();
            }

            return employee.Leaves;
        }
    }
}
