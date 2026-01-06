using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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

        [JsonIgnore]
        public Pais? Pais { get; set; }

        [JsonIgnore]
        public ICollection<Ciudad> Ciudades { get; set; } = new List<Ciudad>();
    }
}