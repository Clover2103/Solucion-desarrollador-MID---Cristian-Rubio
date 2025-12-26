using System.ComponentModel.DataAnnotations;

namespace GestionIntegral.API.Models
{
    public class Pais
    {
        [Key]
        public int PaisId { get; set; }

        [Required]
        [StringLength(100)]
        public string Nombre { get; set; } = string.Empty;
    }
}