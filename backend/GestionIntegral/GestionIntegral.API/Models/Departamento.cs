using System.ComponentModel.DataAnnotations;

namespace GestionIntegral.API.Models
{
    public class Departamento
    {
        [Key]
        public int DepartamentoId { get; set; }

        [Required]
        [StringLength(100)]
        public string Nombre { get; set; } = string.Empty;

        // Foreign Key
        [Required]
        public int PaisId { get; set; }
    }
}