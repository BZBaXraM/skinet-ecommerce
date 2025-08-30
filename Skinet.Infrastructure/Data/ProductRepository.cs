namespace Skinet.Infrastructure.Data;

public class ProductRepository : IProductRepository
{
    private readonly StoreContext _context;

    public ProductRepository(StoreContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<Product>> GetProductsAsync(string? brand, string? type, string? sort)
    {
        var query = _context.Products.AsQueryable();

        if (!string.IsNullOrWhiteSpace(brand))
            query = query.Where(x => x.Brand == brand);
        if (!string.IsNullOrWhiteSpace(type))
            query = query.Where(x => x.Type == type);

        query = sort switch
        {
            "priceAsc" => query.OrderBy(x => x.Price),
            "priceDesc" => query.OrderByDescending(x => x.Price),
            _ => query.OrderBy(x => x.Name)
        };

        return await query.ToListAsync();
    }

    public async Task<Product?> GetProductByIdAsync(int id)
    {
        var productId = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);

        return productId ?? null;
    }

    public async Task<IReadOnlyList<string>> GetBrandsAsync()
    {
        return await _context.Products.Select(x => x.Brand)
            .Distinct()
            .ToListAsync();
    }

    public async Task<IReadOnlyList<string>> GetTypesAsync()
    {
        return await _context.Products.Select(x => x.Type).Distinct().ToListAsync();
    }

    public void AddProduct(Product product)
    {
        _context.Products.Add(product);
    }

    public void UpdateProduct(Product product)
    {
        _context.Entry(product).State = EntityState.Modified;
    }

    public void DeleteProduct(Product product)
    {
        _context.Products.Remove(product);
    }

    public bool ProductExists(int id)
    {
        return _context.Products.Any(x => x.Id == id);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}