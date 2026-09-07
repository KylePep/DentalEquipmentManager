using DentalEquipmentManager.Api.Contracts;

namespace DentalEquipmentManager.Api.Services;

/// <summary>Maintenance-event read/write operations. Owns all EF Core access for maintenance events.</summary>
public interface IMaintenanceEventService
{
    Task<IReadOnlyList<MaintenanceEventDto>> GetAllAsync(CancellationToken ct = default);

    Task<MaintenanceEventDto?> GetByIdAsync(int id, CancellationToken ct = default);

    /// <summary>
    /// Creates an event for <see cref="CreateEventRequest.EquipmentId"/>.
    /// Returns <c>null</c> when no equipment has that id.
    /// </summary>
    Task<MaintenanceEventDto?> CreateAsync(CreateEventRequest request, CancellationToken ct = default);

    /// <summary>Returns the updated event, or <c>null</c> when no event has that id.</summary>
    Task<MaintenanceEventDto?> UpdateAsync(int id, UpdateEventRequest request, CancellationToken ct = default);
}
