namespace DentalEquipmentManager.Api.Contracts;

/// <summary>Wire shape for list responses — no maintenance events.</summary>
public record EquipmentSummaryDto(
  int Id,
  string Name,
  string? Manufacturer,
  string? SerialNumber,
  string? Description,
  DateOnly? PurchaseDate,
  DateOnly? ManufacturerDate,
  DateTimeOffset CreatedAt);

/// <summary>Wire shape for GET /api/equipment/{id} — includes maintenance events.</summary>
public record EquipmentDetailDto(
  int Id,
  string Name,
  string? Manufacturer,
  string? SerialNumber,
  string? Description,
  DateOnly? PurchaseDate,
  DateOnly? ManufacturerDate,
  DateTimeOffset CreatedAt,
  IReadOnlyList<MaintenanceEventDto> MaintenanceEvents);
