using DentalEquipmentManager.Api.Contracts;
using DentalEquipmentManager.Api.Data;
using DentalEquipmentManager.Api.Domain;
using Microsoft.EntityFrameworkCore;

namespace DentalEquipmentManager.Api.Services;

public class EquipmentService(AppDbContext db) : IEquipmentService
{
    public async Task<IReadOnlyList<EquipmentSummaryDto>> GetAllAsync(CancellationToken ct = default) =>
        await db.Equipment
            .OrderBy(e => e.Name)
            .Select(ContractMappings.ToEquipmentSummaryDto)
            .ToListAsync(ct);

    public async Task<EquipmentDetailDto?> GetByIdAsync(int id, CancellationToken ct = default)
    {
        var equipment = await db.Equipment
            .Include(e => e.MaintenanceEvents)
            .AsNoTracking()
            .FirstOrDefaultAsync(e => e.Id == id, ct);

        return equipment?.ToDetailDto();
    }

    public async Task<EquipmentSummaryDto> CreateAsync(CreateEquipmentRequest request, CancellationToken ct = default)
    {
        var equipment = new Equipment
        {
            Name = request.Name,
            Manufacturer = request.Manufacturer,
            SerialNumber = request.SerialNumber,
            PurchaseDate = request.PurchaseDate,
        };

        db.Equipment.Add(equipment);
        await db.SaveChangesAsync(ct);

        return equipment.ToSummaryDto();
    }

    public async Task<EquipmentSummaryDto?> UpdateAsync(int id, UpdateEquipmentRequest request, CancellationToken ct = default)
    {
        var equipment = await db.Equipment.FindAsync([id], ct);
        if (equipment is null)
            return null;

        equipment.Name = request.Name;
        equipment.Manufacturer = request.Manufacturer;
        equipment.SerialNumber = request.SerialNumber;
        equipment.PurchaseDate = request.PurchaseDate;
        equipment.ManufacturerDate = request.ManufacturerDate;
        equipment.Description = request.Description;

        await db.SaveChangesAsync(ct);

        return equipment.ToSummaryDto();
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken ct = default)
    {
        var equipment = await db.Equipment.FindAsync([id], ct);
        if (equipment is null)
            return false;

        db.Equipment.Remove(equipment);
        await db.SaveChangesAsync(ct);

        return true;
    }
}
