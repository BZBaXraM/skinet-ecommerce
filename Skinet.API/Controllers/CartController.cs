namespace Skinet.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CartController : BaseApiController
{
    private readonly ICartService _cartService;

    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }

    [HttpGet]
    public async Task<ActionResult<ShoppingCart>> GetCartById(string id)
    {
        var cart = await _cartService.GetCartAsync(id);

        return Ok(cart ?? new ShoppingCart { Id = id });
    }

    [HttpPost]
    public async Task<ActionResult<ShoppingCart>> UpdateCart(ShoppingCart cart)
    {
        var updatedCart = await _cartService.SetCartAsync(cart);

        if (updatedCart is null) return BadRequest("Problem with cart");

        return cart;
    }

    [HttpDelete]
    public async Task<ActionResult> DeleteCart(string id)
    {
        var cart = await _cartService.DeleteCartAsync(id);

        if (!cart) return BadRequest("Problem with deleting cart");

        return Ok();
    }
}