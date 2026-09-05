namespace DentalEquipmentManager.Api.Domain;

/// <summary>
/// A single piece of dental equipment tracked by the system.
/// Starter entity so migrations and endpoints have something concrete to work with.
/// </summary>
public class Equipment
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public string? Manufacturer { get; set; }

    public string? SerialNumber { get; set; }

    public string? Description { get; set; }

    public DateOnly? PurchaseDate { get; set; }

    public DateOnly? ManufacturerDate { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}
