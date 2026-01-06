using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GestionIntegral.API.Models
{
    public class Ciudad
    {
        [Key]
        public int CiudadId { get; set; }

        [Required]
        [StringLength(100)]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        public int DepartamentoId { get; set; }

        [JsonIgnore]
        public Departamento? Departamento { get; set; }
    }
}