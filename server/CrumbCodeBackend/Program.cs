using CrumbCodeBackend.Repository;
using CrumbCodeBackend.Config;
using CrumbCodeBackend.Interfaces;
using AspNetCore.Swagger.Themes;
using CrumbCodeBackend.Data;
using Microsoft.EntityFrameworkCore;
using CrumbCodeBackend.Service;
using CrumbCodeBackend.Middleware;
using Microsoft.AspNetCore.Authorization;
using System.Text.Json.Serialization;
using DotNetEnv;
using Amazon.S3;
using Amazon;


var builder = WebApplication.CreateBuilder(args);

Env.Load();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerServices();
builder.Services.AddDatabaseContext(builder.Configuration);
builder.Services.AddIdentityService();
builder.Services.AddAuthentication(builder.Configuration);
builder.Services.AddAuthorization();
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

builder.Services.AddSingleton<IAmazonS3Service, AmazonS3Service>();
builder.Services.AddSingleton<IUserContextService, UserContextService>();
builder.Services.AddSingleton<IAuthorizationMiddlewareResultHandler, CustomAuthorizationMiddlewareResultHandler>();
builder.Services.AddSingleton<IAmazonS3>(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>().GetSection("AWS_S3");

    Console.WriteLine("=== AWS S3 CONFIG DEBUG ===");
    Console.WriteLine($"AccessKey: {config["AccessKey"]}...");
    Console.WriteLine($"BucketName: {config["BucketName"]}");
    Console.WriteLine($"Region: {config["Region"]}");
    Console.WriteLine($"ServiceURL: {config["ServiceURL"]}");
    Console.WriteLine("===========================");

    var s3Config = new AmazonS3Config
    {
        RegionEndpoint = RegionEndpoint.GetBySystemName(config["Region"]!),
        ServiceURL = config["ServiceURL"],   // ← keep this for real AWS too
        ForcePathStyle = true                // ← THIS IS REQUIRED even on real AWS when using ServiceURL
    };

    return new AmazonS3Client(
        config["AccessKey"]!,
        config["SecretKey"]!,
        s3Config
    );
});

builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<INotificationRepository, NotificationRepository>();
builder.Services.AddScoped<ICakeRepository, CakeRepository>();
builder.Services.AddScoped<IMediaRepository, MediaRepository>();
builder.Services.AddScoped<ICakeTypeRepository, CakeTypeRepository>();
builder.Services.AddScoped<ISocialMediaRepository, SocialMediaRepository>();
builder.Services.AddScoped<IContactMessageRepository, ContactMessageRepository>();
builder.Services.AddScoped<IDashboardRepository, DashboardRepository>();
builder.WebHost.UseUrls(builder.Configuration["Backend:Url"] ?? throw new InvalidOperationException());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(Style.Dark);
}

app
.UseCors("allowSpecificOrigin")
// .UseHttpsRedirection()
.UseAuthentication()
.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

// app.UseMiddleware<TokenMiddleware>();
app.UseMiddleware<LoggingMiddleware>();
app.UseMiddleware<ApiResponseMiddleware>();
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    try
    {
        var connection = dbContext.Database.GetDbConnection();
        Console.WriteLine("🔍 Connection string being used:");
        Console.WriteLine(connection.ConnectionString);

        dbContext.Database.OpenConnection(); // Test the connection
        dbContext.Database.CloseConnection();
        Console.WriteLine("Database connection successful.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Database connection failed: {ex.Message}");
    }
}

app.Run();