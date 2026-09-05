using System.Text.Json.Serialization;

namespace DentalEquipmentManager.Api.Domain;

public class MaintenanceEvent
{
  public int Id { get; set; }

  public int EquipmentId { get; set; }

  [JsonIgnore]
  public Equipment Equipment { get; set; } = null!;

  public required string Name { get; set; }

  public string? Description { get; set; }

  public DateOnly? Date { get; set; }

  public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}
