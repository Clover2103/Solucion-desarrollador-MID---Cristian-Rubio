using System.ComponentModel.DataAnnotations;

namespace GestionIntegral.API.Models
{
	public class Empleado
	{
		[Key]
		public int EmpleadoId { get; set; }

		[Required]
		[StringLength(50)]
		public string Nombre { get; set; } = string.Empty;

		[Required]
		[StringLength(50)]
		public string Apellido { get; set; } = string.Empty;

		[Required]
		[EmailAddress]
		public string CorreoElectronico { get; set; } = string.Empty;

		[Required]
		public string Cargo { get; set; } = string.Empty;

		public DateTime FechaRegistro { get; set; } = DateTime.Now;
	}
}