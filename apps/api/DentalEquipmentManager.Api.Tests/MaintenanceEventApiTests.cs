using System.Net;
using System.Net.Http.Json;
using DentalEquipmentManager.Api.Contracts;
using FluentAssertions;

namespace DentalEquipmentManager.Api.Tests;

/// <summary>
/// Integration tests for the maintenance-event endpoints: HTTP -> controller -> service -> EF Core -> PostgreSQL.
/// These guard the routes and status codes while the API is refactored onto controllers.
/// </summary>
public class MaintenanceEventApiTests(PostgresApiFactory factory) : IClassFixture<PostgresApiFactory>
{
    private readonly HttpClient _client = factory.CreateClient();

    private async Task<int> CreateEquipmentAsync(string name)
    {
        var response = await _client.PostAsJsonAsync("/api/equipment", new { name });
        response.StatusCode.Should().Be(HttpStatusCode.Created);
        var created = await response.Content.ReadFromJsonAsync<EquipmentSummaryDto>();
        return created!.Id;
    }

    [Fact]
    public async Task Created_event_is_returned_by_the_list_and_by_id()
    {
        var equipmentId = await CreateEquipmentAsync("Compressor (list test)");

        var create = await _client.PostAsJsonAsync("/api/maintenance-events", new
        {
            equipmentId,
            title = "Annual service (list test)",
            description = "Replace filters",
            start = "2026-10-01",
            end = "2026-10-01",
            reoccur = false,
            occurrence = "once",
        });

        create.StatusCode.Should().Be(HttpStatusCode.Created);
        var created = await create.Content.ReadFromJsonAsync<MaintenanceEventDto>();
        created!.EquipmentId.Should().Be(equipmentId);

        var list = await _client.GetFromJsonAsync<List<MaintenanceEventDto>>("/api/maintenance-events");
        list.Should().Contain(e => e.Title == "Annual service (list test)");

        var byId = await _client.GetFromJsonAsync<MaintenanceEventDto>($"/api/maintenance-events/{created.Id}");
        byId!.Title.Should().Be("Annual service (list test)");
    }

    [Fact]
    public async Task Get_unknown_event_returns_404()
    {
        var response = await _client.GetAsync("/api/maintenance-events/999999");

        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task Create_event_for_unknown_equipment_returns_404()
    {
        var response = await _client.PostAsJsonAsync("/api/maintenance-events", new
        {
            equipmentId = 999999,
            title = "Orphan event",
            start = "2026-10-01",
            end = "2026-10-01",
            reoccur = false,
        });

        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task Put_updates_event_fields()
    {
        var equipmentId = await CreateEquipmentAsync("Handpiece (put test)");
        var create = await _client.PostAsJsonAsync("/api/maintenance-events", new
        {
            equipmentId,
            title = "Original title",
            start = "2026-10-01",
            end = "2026-10-01",
            reoccur = false,
        });
        var created = await create.Content.ReadFromJsonAsync<MaintenanceEventDto>();

        var update = await _client.PutAsJsonAsync($"/api/maintenance-events/{created!.Id}", new
        {
            title = "Updated title",
            description = "Now with notes",
            start = "2026-11-15",
            end = "2026-11-15",
            reoccur = true,
            occurrence = "yearly",
        });

        update.StatusCode.Should().Be(HttpStatusCode.OK);
        var updated = await update.Content.ReadFromJsonAsync<MaintenanceEventDto>();
        updated!.Title.Should().Be("Updated title");
        updated.Reoccur.Should().Be(true);
        updated.Occurrence.Should().Be("yearly");
    }

    [Fact]
    public async Task Put_unknown_event_returns_404()
    {
        var response = await _client.PutAsJsonAsync("/api/maintenance-events/999999", new
        {
            title = "Nope",
            description = "",
            start = "2026-10-01",
            end = "2026-10-01",
            reoccur = false,
            occurrence = "once",
        });

        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }
}
