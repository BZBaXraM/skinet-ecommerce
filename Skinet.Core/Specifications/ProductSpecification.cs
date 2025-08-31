namespace Skinet.Core.Specifications;

public class ProductSpecification : BaseSpecification<Product>
{
    public ProductSpecification(ProductSpecParams specParams) : base(x =>
        (string.IsNullOrEmpty(specParams.Search) || x.Name.ToLower().Contains(specParams.Search.ToLower())) &&
        (string.IsNullOrEmpty(specParams.Type) || x.Type.ToLower() == specParams.Type.ToLower()) &&
        (string.IsNullOrEmpty(specParams.Brand) || x.Brand.ToLower() == specParams.Brand.ToLower())
    )
    {
        var skip = (specParams.PageIndex - 1) * specParams.PageSize;
        ApplyPaging(skip, specParams.PageSize);

        switch (specParams.Sort)
        {
            case "priceAsc":
                AddOrderBy(x => x.Price);
                break;
            case "priceDesc":
                AddOrderByDescending(x => x.Price);
                break;
            default:
                AddOrderBy(x => x.Name);
                break;
        }
    }
}