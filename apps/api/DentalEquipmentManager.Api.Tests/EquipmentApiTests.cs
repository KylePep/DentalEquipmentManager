using System.Net;
using System.Net.Http.Json;
using DentalEquipmentManager.Api.Contracts;
using FluentAssertions;

namespace DentalEquipmentManager.Api.Tests;

/// <summary>
/// Example integration test exercising the full stack: HTTP -> endpoint -> EF Core -> PostgreSQL.
/// </summary>
public class EquipmentApiTests(PostgresApiFactory factory) : IClassFixture<PostgresApiFactory>
{
    private readonly HttpClient _client = factory.CreateClient();

    [Fact]
    public async Task Created_equipment_is_returned_by_the_list_endpoint()
    {
        var create = await _client.PostAsJsonAsync("/api/equipment", new
        {
            name = "Autoclave 3000",
            manufacturer = "SteriCo",
            serialNumber = "AC-1234",
        });

        create.StatusCode.Should().Be(HttpStatusCode.Created);

        var list = await _client.GetFromJsonAsync<List<EquipmentSummaryDto>>("/api/equipment");

        list.Should().ContainSingle(e => e.Name == "Autoclave 3000" && e.Manufacturer == "SteriCo");
    }
}
