using DentalEquipmentManager.Api.Data;
using DentalEquipmentManager.Api.Domain;
using Microsoft.EntityFrameworkCore;

namespace DentalEquipmentManager.Api.Endpoints;

public static class MaintenanceEventEndpoints
{
  public static IEndpointRouteBuilder MapMaintenanceEventEndpoints(this IEndpointRouteBuilder routes)
  {
    var group = routes.MapGroup("/api/maintenance-events").WithTags("MaintenanceEvent");

    group.MapGet("/", async (AppDbContext db) =>
    await db.MaintenanceEvents.OrderBy(e => e.Name).ToListAsync());

    group.MapPost("/", async (CreateEventRequest request, AppDbContext db) =>
    {
      var equipmentExists = await db.Equipment.AnyAsync(e => e.Id == request.EquipmentId);

      if (!equipmentExists)
      {
        return Results.NotFound(
          $"Equipment with ID {request.EquipmentId} was not found."
        );
      }

      var maintenanceEvent = new MaintenanceEvent
      {
        EquipmentId = request.EquipmentId,
        Name = request.Name,
        Date = request.Date,
        Description = request.Description,
      };

      db.MaintenanceEvents.Add(maintenanceEvent);
      await db.SaveChangesAsync();

      return Results.Created($"/api/maintenance-events/{maintenanceEvent.Id}", maintenanceEvent);
    });

    return routes;
  }
}

public record CreateEventRequest(
  int EquipmentId,
  string Name,
  DateOnly? Date,
  string? Description
);