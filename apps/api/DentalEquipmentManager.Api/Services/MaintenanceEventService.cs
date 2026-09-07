using DentalEquipmentManager.Api.Contracts;
using DentalEquipmentManager.Api.Data;
using DentalEquipmentManager.Api.Domain;
using Microsoft.EntityFrameworkCore;

namespace DentalEquipmentManager.Api.Services;

public class MaintenanceEventService(AppDbContext db) : IMaintenanceEventService
{
    public async Task<IReadOnlyList<MaintenanceEventDto>> GetAllAsync(CancellationToken ct = default) =>
        await db.MaintenanceEvents
            .OrderBy(e => e.Title)
            .Select(ContractMappings.ToMaintenanceEventDto)
            .ToListAsync(ct);

    public async Task<MaintenanceEventDto?> GetByIdAsync(int id, CancellationToken ct = default)
    {
        var maintenanceEvent = await db.MaintenanceEvents
            .FirstOrDefaultAsync(me => me.Id == id, ct);

        return maintenanceEvent?.ToDto();
    }

    public async Task<MaintenanceEventDto?> CreateAsync(CreateEventRequest request, CancellationToken ct = default)
    {
        var equipmentExists = await db.Equipment.AnyAsync(e => e.Id == request.EquipmentId, ct);
        if (!equipmentExists)
            return null;

        var maintenanceEvent = new MaintenanceEvent
        {
            EquipmentId = request.EquipmentId,
            Title = request.Title,
            Description = request.Description,
            Start = request.Start,
            End = request.End,
            Reoccur = request.Reoccur,
            Occurrence = request.Occurrence,
        };

        db.MaintenanceEvents.Add(maintenanceEvent);
        await db.SaveChangesAsync(ct);

        return maintenanceEvent.ToDto();
    }

    public async Task<MaintenanceEventDto?> UpdateAsync(int id, UpdateEventRequest request, CancellationToken ct = default)
    {
        var maintenanceEvent = await db.MaintenanceEvents.FindAsync([id], ct);
        if (maintenanceEvent is null)
            return null;

        maintenanceEvent.Title = request.Title;
        maintenanceEvent.Description = request.Description;
        maintenanceEvent.Start = request.Start;
        maintenanceEvent.End = request.End;
        maintenanceEvent.Reoccur = request.Reoccur;
        maintenanceEvent.Occurrence = request.Occurrence;

        await db.SaveChangesAsync(ct);

        return maintenanceEvent.ToDto();
    }
}
