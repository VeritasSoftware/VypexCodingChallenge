using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Vypex.CodingChallenge.Infrastructure.Business;
using Vypex.CodingChallenge.Infrastructure.Data;
using Vypex.CodingChallenge.Infrastructure.Repositories;

namespace Vypex.CodingChallenge.Infrastructure
{
    public static class InfrastructureModule
    {
        public static IServiceCollection AddInfrastructureModule(this IServiceCollection services,
            string connectionString)
        {
            services.AddDbContext<CodingChallengeContext>(options => options
                .UseSqlite(connectionString));

            services.AddSingleton<IMapperService, MapperService>();

            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            services.AddScoped<IEmployeeService, EmployeeService>();            

            services.AddScoped<ILeaveRepository, LeaveRepository>();
            services.AddScoped<ILeaveService, LeaveService>();

            return services;
        }
    }
}
