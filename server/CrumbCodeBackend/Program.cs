using CrumbCodeBackend.Repository;
using CrumbCodeBackend.Config;
using CrumbCodeBackend.Interfaces;
using AspNetCore.Swagger.Themes;
using CrumbCodeBackend.Data;
using Microsoft.EntityFrameworkCore;
using CrumbCodeBackend.Service;
using CrumbCodeBackend.Middleware;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerServices();
builder.Services.AddDatabaseContext(builder.Configuration);
builder.Services.AddIdentityService();
builder.Services.AddAuthentication(builder.Configuration);
builder.Services.AddAuthorization();
builder.Services.AddControllers();

builder.Services.AddSingleton<IAmazonS3Service, AmazonS3Service>();
builder.Services.AddSingleton<IUserContextService, UserContextService>();

builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<ICakeRepository, CakeRepository>();
builder.Services.AddScoped<IMediaRepository, MediaRepository>();
builder.Services.AddScoped<ICakeTypeRepository, CakeTypeRepository>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(Style.Dark);
}

app
.UseCors("allowSpecificOrigin")
.UseHttpsRedirection()
.UseAuthentication()
.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage(); // gives full stack trace in browser
}

app.UseMiddleware<TokenMiddleware>();
app.UseMiddleware<Log>();
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    try
    {
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