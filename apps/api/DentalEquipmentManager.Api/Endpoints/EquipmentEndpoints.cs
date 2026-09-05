using DentalEquipmentManager.Api.Data;
using DentalEquipmentManager.Api.Domain;
using Microsoft.EntityFrameworkCore;

namespace DentalEquipmentManager.Api.Endpoints;

public static class EquipmentEndpoints
{
    public static IEndpointRouteBuilder MapEquipmentEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/equipment").WithTags("Equipment");

        group.MapGet("/", async (AppDbContext db) =>
            await db.Equipment.OrderBy(e => e.Name).ToListAsync());

        group.MapGet("/{id:int}", async (int id, AppDbContext db) =>
        {
            var equipment = await db.Equipment
            .Include(e => e.MaintenanceEvents)
            .AsNoTracking()
            .FirstOrDefaultAsync(e => e.Id == id);

            return equipment is not null
            ? Results.Ok(equipment)
            : Results.NotFound();

        });

        group.MapPost("/", async (CreateEquipmentRequest request, AppDbContext db) =>
        {
            var equipment = new Equipment
            {
                Name = request.Name,
                Manufacturer = request.Manufacturer,
                SerialNumber = request.SerialNumber,
                PurchaseDate = request.PurchaseDate,
            };

            db.Equipment.Add(equipment);
            await db.SaveChangesAsync();

            return Results.Created($"/api/equipment/{equipment.Id}", equipment);
        });

        group.MapPut("/{id:int}", async (int id, UpdateEquipmentRequest request, AppDbContext db) =>
        {
            var equipment = await db.Equipment.FindAsync(id);
            if (equipment is null)
                return Results.NotFound();

            equipment.Name = request.Name;
            equipment.Manufacturer = request.Manufacturer;
            equipment.SerialNumber = request.SerialNumber;
            equipment.PurchaseDate = request.PurchaseDate;
            equipment.ManufacturerDate = request.ManufacturerDate;
            equipment.Description = request.Description;

            await db.SaveChangesAsync();

            return Results.Ok(equipment);
        });

        group.MapDelete("/{id:int}", async (int id, AppDbContext db) =>
        {
            var equipment = await db.Equipment.FindAsync(id);
            if (equipment is null)
                return Results.NotFound();

            db.Equipment.Remove(equipment);
            await db.SaveChangesAsync();

            return Results.NoContent();
        }
        );

        return routes;
    }
}

public record CreateEquipmentRequest(
    string Name,
    string? Manufacturer,
    string? SerialNumber,
    DateOnly? PurchaseDate);

public record UpdateEquipmentRequest(
    string Name,
    string? Manufacturer,
    string? SerialNumber,
    DateOnly? PurchaseDate,
    DateOnly? ManufacturerDate,
    string? Description
    );
