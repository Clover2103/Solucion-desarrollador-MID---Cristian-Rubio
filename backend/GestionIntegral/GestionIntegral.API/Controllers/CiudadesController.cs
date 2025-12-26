using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GestionIntegral.API.Data;
using GestionIntegral.API.Models;

namespace GestionIntegral.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CiudadesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CiudadesController(ApplicationDbContext context) => _context = context;

        [HttpGet("pordepartamento/{departamentoId}")]
        public async Task<ActionResult<IEnumerable<Ciudad>>> GetCiudadesPorDepartamento(int departamentoId)
        {
            return await _context.Ciudades
                .Where(c => c.DepartamentoId == departamentoId)
                .ToListAsync();
        }
    }
}