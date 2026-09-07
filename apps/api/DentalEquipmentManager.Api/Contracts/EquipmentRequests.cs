namespace DentalEquipmentManager.Api.Contracts;

/// <summary>Request body for POST /api/equipment.</summary>
public record CreateEquipmentRequest(
  string Name,
  string? Manufacturer,
  string? SerialNumber,
  DateOnly? PurchaseDate);

/// <summary>Request body for PUT /api/equipment/{id}.</summary>
public record UpdateEquipmentRequest(
  string Name,
  string? Manufacturer,
  string? SerialNumber,
  DateOnly? PurchaseDate,
  DateOnly? ManufacturerDate,
  string? Description);
