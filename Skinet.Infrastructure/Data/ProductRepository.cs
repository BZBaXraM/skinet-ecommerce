namespace Skinet.Infrastructure.Data;

public class ProductRepository : IProductRepository
{
    private readonly StoreContext _context;

    public ProductRepository(StoreContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<Product>> GetProductsAsync()
    {
        return await _context.Products.ToListAsync();
    }
    public async Task<Product?> GetProductByIdAsync(int id)
    {
        var productId = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);

        if (productId is null) return null;

        return productId;
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
