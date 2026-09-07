using DentalEquipmentManager.Api.Contracts;
using DentalEquipmentManager.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace DentalEquipmentManager.Api.Controllers;

[ApiController]
[Route("api/maintenance-events")]
[Tags("MaintenanceEvent")]
public class MaintenanceEventsController(IMaintenanceEventService maintenanceEvents) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<MaintenanceEventDto>>> GetAll(CancellationToken ct) =>
        Ok(await maintenanceEvents.GetAllAsync(ct));

    [HttpGet("{id:int}")]
    public async Task<ActionResult<MaintenanceEventDto>> GetById(int id, CancellationToken ct)
    {
        var dto = await maintenanceEvents.GetByIdAsync(id, ct);
        return dto is not null ? Ok(dto) : NotFound();
    }

    [HttpPost]
    public async Task<ActionResult<MaintenanceEventDto>> Create(CreateEventRequest request, CancellationToken ct)
    {
        var created = await maintenanceEvents.CreateAsync(request, ct);
        return created is not null
            ? CreatedAtAction(nameof(GetById), new { id = created.Id }, created)
            : NotFound($"Equipment with ID {request.EquipmentId} was not found.");
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<MaintenanceEventDto>> Update(int id, UpdateEventRequest request, CancellationToken ct)
    {
        var updated = await maintenanceEvents.UpdateAsync(id, request, ct);
        return updated is not null ? Ok(updated) : NotFound();
    }
}
