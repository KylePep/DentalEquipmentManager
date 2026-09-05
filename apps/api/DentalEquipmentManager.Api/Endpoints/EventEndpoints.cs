using DentalEquipmentManager.Api.Data;
using DentalEquipmentManager.Api.Domain;
using Microsoft.EntityFrameworkCore;

namespace DentalEquipmentManager.Api.Endpoints;

public static class MaintenanceEventEndpoints
{
  public static IEndpointRouteBuilder MapMaintenanceEventEndpoints(this IEndpointRouteBuilder routes)
  {
    var group = routes.MapGroup("/api/maintenance_event").WithTags("MaintenanceEvent");

    group.MapGet("/", async (AppDbContext db) =>
    await db.MaintenanceEvent.OrderBy(e => e.Name).ToListAsync());

    group.MapPost("/", async (CreateEventRequest request, AppDbContext db) =>
    {
      var maintenanceEvent = new MaintenanceEvent
      {
        Name = request.Name,
        Date = request.Date,
        Description = request.Description,
      };

      db.MaintenanceEvent.Add(maintenanceEvent);
      await db.SaveChangesAsync();

      return Results.Created($"/api/event/{maintenanceEvent.Id}", maintenanceEvent);
    });

    return routes;
  }
}

public record CreateEventRequest(
  string Name,
  DateOnly? Date,
  string? Description
);