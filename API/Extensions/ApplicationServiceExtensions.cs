using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using API.Interfaces;
using API.Helpers;
using API.Data;
using Microsoft.EntityFrameworkCore;
using EmailService;
using Stripe;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<ITokenService, Services.TokenService>();
            services.AddScoped<LogUserActivity>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

            var emailConfig = config
                        .GetSection("EmailConfiguration")
                        .Get<EmailConfiguration>();
            services.AddSingleton(emailConfig);
            services.AddScoped<IEmailSender, EmailSender>();

            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            
			services.Configure<StripeSettings>(config.GetSection("StripeSettings"));
			StripeConfiguration.ApiKey = config.GetValue<string>("StripeSettings:PrivateKey");


            return services;
        }
    }
}