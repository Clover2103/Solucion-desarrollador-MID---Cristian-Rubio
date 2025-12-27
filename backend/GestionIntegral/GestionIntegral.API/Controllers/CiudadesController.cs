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

        [HttpGet("pordepartamento/{deptoId}")] // READ (Filtrado)
        public async Task<ActionResult<IEnumerable<Ciudad>>> GetPorDepto(int deptoId) 
            => await _context.Ciudades.Where(c => c.DepartamentoId == deptoId).ToListAsync();

        [HttpPost] // CREATE
        public async Task<ActionResult<Ciudad>> PostCiudad(Ciudad ciudad)
        {
            _context.Ciudades.Add(ciudad);
            await _context.SaveChangesAsync();
            return Ok(ciudad);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCiudad(int id, Ciudad ciudad)
        {
            if (id != ciudad.CiudadId) return BadRequest();
            _context.Entry(ciudad).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")] // DELETE
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