using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace GestionIntegral.API.Models
{
    public class Departamento
    {
        [Key]
        public int DepartamentoId { get; set; }

        [Required]
        [StringLength(100)]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        public int PaisId { get; set; }

        // Propiedad de navegación hacia el Padre (Pais)
        public Pais? Pais { get; set; }

        // Propiedad de navegación hacia los Hijos (Ciudades)
        public ICollection<Ciudad> Ciudades { get; set; } = new List<Ciudad>();
    }
}