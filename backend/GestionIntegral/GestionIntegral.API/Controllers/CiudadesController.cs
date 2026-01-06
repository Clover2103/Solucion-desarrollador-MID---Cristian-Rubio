using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GestionIntegral.API.Data;
using GestionIntegral.API.Models;

namespace GestionIntegral.API.Controllers
{
    [Route("api/Ciudades")]
    [ApiController]
    public class CiudadesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public CiudadesController(ApplicationDbContext context) => _context = context;

        [HttpGet("pordepartamento/{deptoId}")]
        public async Task<ActionResult<IEnumerable<Ciudad>>> GetPorDepto(int deptoId)
            => await _context.Ciudades.Where(c => c.DepartamentoId == deptoId).ToListAsync();

        [HttpPost]
        public async Task<ActionResult<Ciudad>> PostCiudad(Ciudad ciudad)
        {
            ciudad.Departamento = null;
            _context.Ciudades.Add(ciudad);
            await _context.SaveChangesAsync();
            return Ok(ciudad);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCiudad(int id, Ciudad ciudad)
        {
            if (ciudad.CiudadId == 0) ciudad.CiudadId = id;
            if (id != ciudad.CiudadId) return BadRequest("IDs no coinciden");

            var ciudadDb = await _context.Ciudades.FindAsync(id);
            if (ciudadDb == null) return NotFound();

            ciudadDb.Nombre = ciudad.Nombre;
            ciudadDb.DepartamentoId = ciudad.DepartamentoId;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCiudad(int id)
        {
            var ciudad = await _context.Ciudades.FindAsync(id);
            if (ciudad == null) return NotFound();
            _context.Ciudades.Remove(ciudad);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}