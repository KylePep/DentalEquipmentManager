namespace DentalEquipmentManager.Api.Contracts;

/// <summary>Wire shape for a maintenance event returned by the API.</summary>
public record MaintenanceEventDto(
  int Id,
  int EquipmentId,
  string Title,
  string? Description,
  DateOnly? Start,
  DateOnly? End,
  bool? Reoccur,
  string? Occurrence,
  DateTimeOffset CreatedAt);
