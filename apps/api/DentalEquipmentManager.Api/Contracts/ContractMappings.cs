using System.Linq.Expressions;
using DentalEquipmentManager.Api.Domain;

namespace DentalEquipmentManager.Api.Contracts;

/// <summary>
/// Entity -> DTO mapping. The <c>Expression</c> fields are handed to EF Core so
/// list queries project straight to the DTO columns; the extension methods map
/// entities already materialised in memory (POST/PUT results, nested collections).
/// </summary>
public static class ContractMappings
{
  public static readonly Expression<Func<Equipment, EquipmentSummaryDto>> ToEquipmentSummaryDto =
    e => new EquipmentSummaryDto(
      e.Id,
      e.Name,
      e.Manufacturer,
      e.SerialNumber,
      e.Description,
      e.PurchaseDate,
      e.ManufacturerDate,
      e.CreatedAt);

  public static readonly Expression<Func<MaintenanceEvent, MaintenanceEventDto>> ToMaintenanceEventDto =
    e => new MaintenanceEventDto(
      e.Id,
      e.EquipmentId,
      e.Title,
      e.Description,
      e.Start,
      e.End,
      e.Reoccur,
      e.Occurrence,
      e.CreatedAt);

  private static readonly Func<Equipment, EquipmentSummaryDto> SummaryMap = ToEquipmentSummaryDto.Compile();
  private static readonly Func<MaintenanceEvent, MaintenanceEventDto> EventMap = ToMaintenanceEventDto.Compile();

  public static EquipmentSummaryDto ToSummaryDto(this Equipment equipment) => SummaryMap(equipment);

  public static MaintenanceEventDto ToDto(this MaintenanceEvent maintenanceEvent) => EventMap(maintenanceEvent);

  public static EquipmentDetailDto ToDetailDto(this Equipment equipment) =>
    new(
      equipment.Id,
      equipment.Name,
      equipment.Manufacturer,
      equipment.SerialNumber,
      equipment.Description,
      equipment.PurchaseDate,
      equipment.ManufacturerDate,
      equipment.CreatedAt,
      equipment.MaintenanceEvents
        .OrderBy(m => m.Start)
        .Select(EventMap)
        .ToList());
}
