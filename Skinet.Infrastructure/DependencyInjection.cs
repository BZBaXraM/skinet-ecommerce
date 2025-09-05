using StackExchange.Redis;

namespace Skinet.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

        services.AddDbContext<StoreContext>(options =>
        {
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"));
        });

        services.AddSingleton<IConnectionMultiplexer>(_ =>
        {
            var connString = configuration.GetConnectionString("Redis") ??
                             throw new Exception("Cannot get redis connection string");
            
            var config = ConfigurationOptions.Parse(connString, true);
            return ConnectionMultiplexer.Connect(config);
        });

        return services;
    }
}