using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GestionIntegral.API.Models
{
    public class Pais
    {
        [Key]
        public int PaisId { get; set; }

        [Required]
        [StringLength(100)]
        public string Nombre { get; set; } = string.Empty;

        [JsonIgnore]
        public ICollection<Departamento> Departamentos { get; set; } = new List<Departamento>();
    }
}