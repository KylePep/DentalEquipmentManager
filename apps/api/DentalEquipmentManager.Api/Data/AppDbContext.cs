using DentalEquipmentManager.Api.Domain;
using Microsoft.EntityFrameworkCore;

namespace DentalEquipmentManager.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Equipment> Equipment => Set<Equipment>();
    public DbSet<MaintenanceEvent> MaintenanceEvents => Set<MaintenanceEvent>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Equipment>(entity =>
        {
            entity.Property(e => e.Name).HasMaxLength(200).IsRequired();
            entity.Property(e => e.Manufacturer).HasMaxLength(200);
            entity.Property(e => e.SerialNumber).HasMaxLength(100);
        });

        modelBuilder.Entity<MaintenanceEvent>(entity =>
        {
            entity.HasOne(e => e.Equipment)
            .WithMany(e => e.MaintenanceEvents)
            .HasForeignKey(e => e.EquipmentId);

            entity.Property(e => e.Title).HasMaxLength(200).IsRequired();
            entity.Property(e => e.Description).HasMaxLength(1200);
        });
    }
}
