namespace DentalEquipmentManager.Api.Contracts;

/// <summary>Request body for POST /api/maintenance-events.</summary>
public record CreateEventRequest(
  int EquipmentId,
  string Title,
  string? Description,
  DateOnly Start,
  DateOnly End,
  bool Reoccur,
  string? Occurrence);

/// <summary>Request body for PUT /api/maintenance-events/{id}.</summary>
public record UpdateEventRequest(
  string Title,
  string Description,
  DateOnly Start,
  DateOnly End,
  bool Reoccur,
  string? Occurrence);
