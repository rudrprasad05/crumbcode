using CrumbCodeBackend.Repository;
using CrumbCodeBackend.Config;
using CrumbCodeBackend.Interfaces;
using AspNetCore.Swagger.Themes;
using CrumbCodeBackend.Data;
using Microsoft.EntityFrameworkCore;
using CrumbCodeBackend.Service;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerServices();
builder.Services.AddControllers();
builder.Services.AddDatabaseContext(builder.Configuration);
builder.Services.AddAuthentication(builder.Configuration);
builder.Services.AddIdentityService();

builder.Services.AddSingleton<IAmazonS3Service, AmazonS3Service>();

builder.Services.AddScoped<ICakeRepository, CakeRepository>();
builder.Services.AddScoped<IMediaRepository, MediaRepository>();

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

// app.UseMiddleware<TokenMiddleware>();
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
