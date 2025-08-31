namespace Skinet.Infrastructure.Data;

public abstract class SpecificationEvaluator<T> where T : BaseEntity
{
    public static IQueryable<T> GetQuery(IQueryable<T> query, ISpecification<T> spec)
    {
        if (spec.Criteria is not null)
        {
            query = query.Where(spec.Criteria);
        }

        if (spec.OrderBy is not null)
        {
            query = query.OrderBy(spec.OrderBy);
        }

        if (spec.OrderByDescending is not null)
        {
            query = query.OrderByDescending(spec.OrderByDescending);
        }

        if (spec.IsPagingEnabled)
        {
            query = query.Skip(spec.Skip).Take(spec.Take);
        }

        return query;
    }

    public static IQueryable<TResult> GetQuery<TResult>(IQueryable<T> query,
        ISpecification<T, TResult> spec)
    {
        if (spec.Criteria is not null)
        {
            query = query.Where(spec.Criteria);
        }

        if (spec.OrderBy is not null)
        {
            query = query.OrderBy(spec.OrderBy);
        }

        if (spec.OrderByDescending is not null)
        {
            query = query.OrderByDescending(spec.OrderByDescending);
        }

        var selectQuery = spec.Select != null ? query.Select(spec.Select) : query.Cast<TResult>();

        if (spec.IsDistinct)
        {
            selectQuery = selectQuery.Distinct();
        }

        if (spec.IsPagingEnabled)
        {
            selectQuery = query.Skip(spec.Skip).Take(spec.Take) as IQueryable<TResult>;
        }

        return selectQuery!;
    }
}