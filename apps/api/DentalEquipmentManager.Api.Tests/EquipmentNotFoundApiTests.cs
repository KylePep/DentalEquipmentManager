using System.Net;
using System.Net.Http.Json;
using DentalEquipmentManager.Api.Contracts;
using FluentAssertions;

namespace DentalEquipmentManager.Api.Tests;

/// <summary>
/// Guards the not-found and cascade-delete behaviour of the equipment endpoints
/// while the API is refactored onto controllers.
/// </summary>
public class EquipmentNotFoundApiTests(PostgresApiFactory factory) : IClassFixture<PostgresApiFactory>
{
    private readonly HttpClient _client = factory.CreateClient();

    [Fact]
    public async Task Get_unknown_equipment_returns_404()
    {
        var response = await _client.GetAsync("/api/equipment/999999");

        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task Put_unknown_equipment_returns_404()
    {
        var response = await _client.PutAsJsonAsync("/api/equipment/999999", new
        {
            name = "Nope",
        });

        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task Delete_unknown_equipment_returns_404()
    {
        var response = await _client.DeleteAsync("/api/equipment/999999");

        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task Delete_equipment_removes_it_and_its_events()
    {
        var createEquipment = await _client.PostAsJsonAsync("/api/equipment", new { name = "Scaler (delete test)" });
        var equipment = await createEquipment.Content.ReadFromJsonAsync<EquipmentSummaryDto>();

        var createEvent = await _client.PostAsJsonAsync("/api/maintenance-events", new
        {
            equipmentId = equipment!.Id,
            title = "Event on doomed equipment",
            start = "2026-10-01",
            end = "2026-10-01",
            reoccur = false,
        });
        var maintenanceEvent = await createEvent.Content.ReadFromJsonAsync<MaintenanceEventDto>();

        var delete = await _client.DeleteAsync($"/api/equipment/{equipment.Id}");
        delete.StatusCode.Should().Be(HttpStatusCode.NoContent);

        (await _client.GetAsync($"/api/equipment/{equipment.Id}")).StatusCode
            .Should().Be(HttpStatusCode.NotFound);
        (await _client.GetAsync($"/api/maintenance-events/{maintenanceEvent!.Id}")).StatusCode
            .Should().Be(HttpStatusCode.NotFound);
    }
}
