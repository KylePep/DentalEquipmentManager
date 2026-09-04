using DentalEquipmentManager.Api.Data;
using DentalEquipmentManager.Api.Domain;
using Microsoft.EntityFrameworkCore;

namespace DentalEquipmentManager.Api.Endpoints;

/// <summary>
/// Example CRUD-ish endpoints for <see cref="Equipment"/>. Enough to prove the
/// web -> API -> database wiring end to end; extend as real features are added.
/// </summary>
public static class EquipmentEndpoints
{
    public static IEndpointRouteBuilder MapEquipmentEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/equipment").WithTags("Equipment");

        group.MapGet("/", async (AppDbContext db) =>
            await db.Equipment.OrderBy(e => e.Name).ToListAsync());

        group.MapGet("/{id:int}", async (int id, AppDbContext db) =>
            await db.Equipment.FindAsync(id) is { } equipment
                ? Results.Ok(equipment)
                : Results.NotFound());

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

        group.MapPut("/{id:int}", async (int id, CreateEquipmentRequest request, AppDbContext db) =>
        {
            var equipment = await db.Equipment.FindAsync(id);
            if (equipment is null)
                return Results.NotFound();

            equipment.Name = request.Name;
            equipment.Manufacturer = request.Manufacturer;
            equipment.SerialNumber = request.SerialNumber;
            equipment.PurchaseDate = request.PurchaseDate;

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
