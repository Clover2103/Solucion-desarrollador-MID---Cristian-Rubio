using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace GestionIntegral.API.Models
{
    public class Pais
    {
        [Key]
        public int PaisId { get; set; }

        [Required]
        [StringLength(100)]
        public string Nombre { get; set; } = string.Empty;

        // Propiedad de navegación para la relación con Departamentos
        public ICollection<Departamento> Departamentos { get; set; } = new List<Departamento>();
    }
}