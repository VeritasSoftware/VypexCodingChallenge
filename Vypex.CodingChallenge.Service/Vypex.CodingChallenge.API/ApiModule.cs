using Microsoft.Extensions.DependencyInjection;
using Vypex.CodingChallenge.Domain.Models;
using Vypex.CodingChallenge.Infrastructure.Business;
using Vypex.CodingChallenge.Infrastructure.Repositories;

namespace Vypex.CodingChallenge.API
{
    public static class ApiModule
    {
        public static IServiceCollection AddApiModule(this IServiceCollection services)
        {
            services.AddSingleton<IMapperService, MapperService>();
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            services.AddScoped<IRepository<Employee>, EmployeeRepository>();

            return services;
        }

        public static IMvcBuilder AddApiControllers(this IMvcBuilder builder)
        {
            return builder.AddApplicationPart(typeof(ApiModule).Assembly);
        }
    }
}
