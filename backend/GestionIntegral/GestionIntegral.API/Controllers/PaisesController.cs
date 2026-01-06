using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GestionIntegral.API.Data;
using GestionIntegral.API.Models;

namespace GestionIntegral.API.Controllers
{
    [Route("api/Paises")]
    [ApiController]
    public class PaisesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public PaisesController(ApplicationDbContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pais>>> GetPaises()
            => await _context.Paises.ToListAsync();

        [HttpPost]
        public async Task<ActionResult<Pais>> PostPais(Pais pais)
        {
            _context.Paises.Add(pais);
            await _context.SaveChangesAsync();
            return Ok(pais);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPais(int id, Pais pais)
        {
            if (pais.PaisId == 0) pais.PaisId = id;
            if (id != pais.PaisId) return BadRequest("IDs no coinciden");

            var paisDb = await _context.Paises.FindAsync(id);
            if (paisDb == null) return NotFound();

            paisDb.Nombre = pais.Nombre;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePais(int id)
        {
            var pais = await _context.Paises.FindAsync(id);
            if (pais == null) return NotFound();
            _context.Paises.Remove(pais);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}