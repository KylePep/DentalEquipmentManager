using DentalEquipmentManager.Api.Contracts;
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
    await db.MaintenanceEvents
      .OrderBy(e => e.Title)
      .Select(ContractMappings.ToMaintenanceEventDto)
      .ToListAsync());

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
        Title = request.Title,
        Description = request.Description,
        Start = request.Start,
        End = request.End,
        Reoccur = request.Reoccur,
        Occurrence = request.Occurrence
      };

      db.MaintenanceEvents.Add(maintenanceEvent);
      await db.SaveChangesAsync();

      return Results.Created($"/api/maintenance-events/{maintenanceEvent.Id}", maintenanceEvent.ToDto());
    });

    return routes;
  }
}

public record CreateEventRequest(
  int EquipmentId,
  string Title,
  string? Description,
  DateOnly Start,
  DateOnly End,
  bool Reoccur,
  string? Occurrence
);