using Microsoft.AspNetCore.Mvc;

namespace GestionIntegral.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost("login")] // Esto completa la ruta /api/auth/login
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Validación simple para la prueba técnica
            if (request.Usuario == "admin" && request.Password == "admin123")
            {
                // Devolvemos un objeto con un token ficticio
                return Ok(new
                {
                    token = "token-de-prueba-123",
                    user = "Administrador"
                });
            }

            // Si las credenciales no coinciden
            return Unauthorized(new { message = "Usuario o contraseña incorrectos" });
        }
    }

    public class LoginRequest
    {
        public string Usuario { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}