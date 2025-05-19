using AutoMapper;
using Vypex.CodingChallenge.Domain.Models;
using Vypex.CodingChallenge.Domain.PresentationModels;

namespace Vypex.CodingChallenge.Infrastructure.Business
{
    public class MapperService : IMapperService
    {
        private readonly IMapper _mapper;

        public MapperService()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Employee, EmployeeModel>()
                   .ForMember(e => e.TotalLeaveDays, e => e.MapFrom(e => e.Leaves.Select(l =>  (l.EndDate == l.StartDate) ? 1 : l.EndDate.AddDays(1).Date.Subtract(l.StartDate.Date).Days).Sum()));

                cfg.CreateMap<Leave, LeaveModel>();
                cfg.CreateMap<LeaveModel, Leave>()
                   .ForMember(lm => lm.Employee, l => l.Ignore());
            });
            _mapper = new Mapper(config);
        }

        public TDestination Map<TSource, TDestination>(TSource source)
        {
            return _mapper.Map<TSource, TDestination>(source);
        }

        public IEnumerable<TDestination> Map<TSource, TDestination>(IEnumerable<TSource> source)
        {
            return source.Select(_mapper.Map<TSource, TDestination>);
        }
    }
}
