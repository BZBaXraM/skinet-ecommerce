using Skinet.API.RequestHelpers;
using Skinet.Core.Specifications;

namespace Skinet.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly IGenericRepository<Product> _genericRepository;

    public ProductsController(IGenericRepository<Product> genericRepository)
    {
        _genericRepository = genericRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts([FromQuery] ProductSpecParams specParams)
    {
        var spec = new ProductSpecification(specParams);

        var products = await _genericRepository.ListAllAsync(spec); 
        
        var count = await _genericRepository.CountAsync(spec);
        
        return Ok(new Pagination<Product>(specParams.PageIndex, specParams.PageSize, count, products));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Product>> GetProductById(int id)
    {
        var product = await _genericRepository.GetByIdAsync(id);

        if (product == null) NotFound("Product Not Found!");

        return Ok(product);
    }

    [HttpGet("brands")]
    public async Task<ActionResult<IReadOnlyList<string>>> GetBrads()
    {
        return Ok(await _genericRepository.ListAsync(new BrandListSpecification()));
    }

    [HttpGet("types")]
    public async Task<ActionResult<IReadOnlyList<string>>> GetTypes()
    {
        return Ok(await _genericRepository.ListAsync(new TypeListSpecification()));
    }

    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct(Product product)
    {
        _genericRepository.Add(product);

        await _genericRepository.SaveAllAsync();

        return product;
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<Product>> UpdateProduct(int id, Product product)
    {
        if (!_genericRepository.Exists(id)) return BadRequest("Cannot update this product");

        _genericRepository.Update(product);
        await _genericRepository.SaveAllAsync();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteProduct(int id)
    {
        var product = await _genericRepository.GetByIdAsync(id);
        if (product == null) return NotFound();

        _genericRepository.Remove(product);

        await _genericRepository.SaveAllAsync();

        return NoContent();
    }
}