namespace DentalEquipmentManager.Api.Domain;

public class MaintenanceEvent
{
  public int Id { get; set; }

  public int EquipmentId { get; set; }

  public Equipment Equipment { get; set; } = null!;

  public required string Title { get; set; }

  public string? Description { get; set; }

  public DateOnly? Start { get; set; }
  public DateOnly? End { get; set; }
  public bool? Reoccur { get; set; } = false;
  public string? Occurrence { get; set; } = "once";

  public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}
