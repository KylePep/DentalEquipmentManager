using DentalEquipmentManager.Api.Data;
using DentalEquipmentManager.Api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

// Scoped to match the AppDbContext lifetime they depend on.
builder.Services.AddScoped<IEquipmentService, EquipmentService>();
builder.Services.AddScoped<IMaintenanceEventService, MaintenanceEventService>();

const string WebAppCorsPolicy = "WebApp";
builder.Services.AddCors(options =>
    options.AddPolicy(WebAppCorsPolicy, policy => policy
        .WithOrigins(builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [])
        .AllowAnyHeader()
        .AllowAnyMethod()));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors(WebAppCorsPolicy);

app.MapGet("/health", () => Results.Ok(new { status = "ok" })).WithTags("Health");
app.MapControllers();

app.Run();

// Exposed so the integration test project can drive the app via WebApplicationFactory.
public partial class Program;
