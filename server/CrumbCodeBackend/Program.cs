using CrumbCodeBackend.Repository;
using CrumbCodeBackend.Config;
using CrumbCodeBackend.Interfaces;
using AspNetCore.Swagger.Themes;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerServices();
builder.Services.AddControllers();
builder.Services.AddDatabaseContext(builder.Configuration);
builder.Services.AddAuthentication(builder.Configuration);
builder.Services.AddIdentityService();
// builder.Services.Configure<ResendClientOptions>( o =>
// {
//     o.ApiToken = builder.Configuration["Resend:API"]!;
// } );

builder.Services.AddScoped<ICakeRepository, CakeRepository>();


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

app.Run();
