using DentalEquipmentManager.Api.Contracts;

namespace DentalEquipmentManager.Api.Services;

/// <summary>Equipment read/write operations. Owns all EF Core access for equipment.</summary>
public interface IEquipmentService
{
    Task<IReadOnlyList<EquipmentSummaryDto>> GetAllAsync(CancellationToken ct = default);

    Task<EquipmentDetailDto?> GetByIdAsync(int id, CancellationToken ct = default);

    Task<EquipmentSummaryDto> CreateAsync(CreateEquipmentRequest request, CancellationToken ct = default);

    /// <summary>Returns the updated summary, or <c>null</c> when no equipment has that id.</summary>
    Task<EquipmentSummaryDto?> UpdateAsync(int id, UpdateEquipmentRequest request, CancellationToken ct = default);

    /// <summary>Returns <c>false</c> when no equipment has that id. Maintenance events cascade-delete.</summary>
    Task<bool> DeleteAsync(int id, CancellationToken ct = default);
}
