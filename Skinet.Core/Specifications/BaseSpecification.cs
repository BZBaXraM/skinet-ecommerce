namespace Skinet.Core.Specifications;

public class BaseSpecification<T>(Expression<Func<T, bool>>? expression) : ISpecification<T>
{
    protected BaseSpecification() : this(null)
    {
    }

    public Expression<Func<T, bool>>? Criteria => expression;
    public Expression<Func<T, object>>? OrderBy { get; private set; }
    public Expression<Func<T, object>>? OrderByDescending { get; private set; }
    public bool IsDistinct { get; private set; }

    protected void AddOrderBy(Expression<Func<T, object>> orderByExpression)
    {
        OrderBy = orderByExpression;
    }

    protected void AddOrderByDescending(Expression<Func<T, object>> orderByDescExpression)
    {
        OrderByDescending = orderByDescExpression;
    }

    protected void ApplyDistinct()
    {
        IsDistinct = true;
    }
}

public class BaseSpecification<T, TResult>(Expression<Func<T, bool>>? expression)
    : BaseSpecification<T>(expression), ISpecification<T, TResult>
{
    protected BaseSpecification() : this(null)
    {
    }

    public Expression<Func<T, TResult>>? Select { get; private set; }

    protected void AddSelect(Expression<Func<T, TResult>> expression)
    {
        Select = expression;
    }
}