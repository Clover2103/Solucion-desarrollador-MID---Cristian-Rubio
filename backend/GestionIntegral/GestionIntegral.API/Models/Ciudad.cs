using System.ComponentModel.DataAnnotations;

namespace GestionIntegral.API.Models
{
    public class Ciudad
    {
        [Key]
        public int CiudadId { get; set; }

        [Required]
        [StringLength(100)]
        public string Nombre { get; set; } = string.Empty;

        // Foreign Key
        [Required]
        public int DepartamentoId { get; set; }
    }
}