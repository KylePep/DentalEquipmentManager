using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DentalEquipmentManager.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class equipmentdesc_manuDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Equipment",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateOnly>(
                name: "ManufacturerDate",
                table: "Equipment",
                type: "date",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Equipment");

            migrationBuilder.DropColumn(
                name: "ManufacturerDate",
                table: "Equipment");
        }
    }
}
