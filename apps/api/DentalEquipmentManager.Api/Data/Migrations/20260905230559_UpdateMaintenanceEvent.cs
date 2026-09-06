using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DentalEquipmentManager.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMaintenanceEvent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "MaintenanceEvents",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "MaintenanceEvents",
                newName: "Start");

            migrationBuilder.AddColumn<DateOnly>(
                name: "End",
                table: "MaintenanceEvents",
                type: "date",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Occurrence",
                table: "MaintenanceEvents",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Reoccur",
                table: "MaintenanceEvents",
                type: "boolean",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "End",
                table: "MaintenanceEvents");

            migrationBuilder.DropColumn(
                name: "Occurrence",
                table: "MaintenanceEvents");

            migrationBuilder.DropColumn(
                name: "Reoccur",
                table: "MaintenanceEvents");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "MaintenanceEvents",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "Start",
                table: "MaintenanceEvents",
                newName: "Date");
        }
    }
}
