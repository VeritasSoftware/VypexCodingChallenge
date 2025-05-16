namespace Vypex.CodingChallenge.Infrastructure.Business
{
    public interface IMapperService
    {
        TDestination Map<TSource, TDestination>(TSource source);
        IEnumerable<TDestination> Map<TSource, TDestination>(IEnumerable<TSource> source);
    }
}