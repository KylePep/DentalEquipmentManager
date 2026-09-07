using DentalEquipmentManager.Api.Contracts;
using DentalEquipmentManager.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace DentalEquipmentManager.Api.Controllers;

[ApiController]
[Route("api/equipment")]
[Tags("Equipment")]
public class EquipmentController(IEquipmentService equipment) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<EquipmentSummaryDto>>> GetAll(CancellationToken ct) =>
        Ok(await equipment.GetAllAsync(ct));

    [HttpGet("{id:int}")]
    public async Task<ActionResult<EquipmentDetailDto>> GetById(int id, CancellationToken ct)
    {
        var dto = await equipment.GetByIdAsync(id, ct);
        return dto is not null ? Ok(dto) : NotFound();
    }

    [HttpPost]
    public async Task<ActionResult<EquipmentSummaryDto>> Create(CreateEquipmentRequest request, CancellationToken ct)
    {
        var created = await equipment.CreateAsync(request, ct);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<EquipmentSummaryDto>> Update(int id, UpdateEquipmentRequest request, CancellationToken ct)
    {
        var updated = await equipment.UpdateAsync(id, request, ct);
        return updated is not null ? Ok(updated) : NotFound();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        var deleted = await equipment.DeleteAsync(id, ct);
        return deleted ? NoContent() : NotFound();
    }
}
