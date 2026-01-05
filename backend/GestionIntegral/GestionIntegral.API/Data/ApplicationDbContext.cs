using Microsoft.EntityFrameworkCore;
using GestionIntegral.API.Models;

namespace GestionIntegral.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Definición de las tablas
        public DbSet<Empleado> Empleados { get; set; }
        public DbSet<Pais> Paises { get; set; }
        public DbSet<Departamento> Departamentos { get; set; }
        public DbSet<Ciudad> Ciudades { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuración Cascada: Departamento -> Ciudad
            modelBuilder.Entity<Departamento>()
                .HasMany(d => d.Ciudades)
                .WithOne(c => c.Departamento)
                .HasForeignKey(c => c.DepartamentoId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configuración Cascada: Pais -> Departamento
            modelBuilder.Entity<Pais>()
                .HasMany(p => p.Departamentos)
                .WithOne(d => d.Pais)
                .HasForeignKey(d => d.PaisId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}