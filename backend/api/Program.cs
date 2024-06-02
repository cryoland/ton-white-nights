using api.Authorization;
using api.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.OpenApi.Models;

namespace api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Authorization
            builder.Services.AddHttpContextAccessor();
            builder.Services.AddScoped<ApiKeyAuthHandler>();
            builder.Services.AddSingleton(provider => new ApiKeyConfig
            {
                ApiKey = Environment.GetEnvironmentVariable("API_AUTH_TOKEN")
            });
            builder.Services.AddAuthentication("ApiKey")
                                .AddScheme<AuthenticationSchemeOptions, ApiKeyAuthHandler>("ApiKey", o => { });

            builder.Services.AddRouting(options =>
            {
                options.AppendTrailingSlash = true;
                options.LowercaseUrls = true;
            })
            .AddControllers()
            .AddNewtonsoftJson();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c => {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "TON White Nights API",
                    Version = "v1"
                });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 1safsfsdfdfd\"",
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement {
                    {
                        new OpenApiSecurityScheme {
                            Reference = new OpenApiReference {
                                Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                            }
                        },
                        new string[] {}
                    }
                });
            });

            builder.Services.AddSingleton<FakeContext>();

            // !! for test only
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: "all",
                                  builder =>
                                  {
                                      builder.AllowAnyMethod()
                                             .AllowAnyOrigin()
                                             .AllowAnyHeader();
                                  });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseCors("all");
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}