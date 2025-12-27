using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GestionIntegral.API.Data;
using GestionIntegral.API.Models;

namespace GestionIntegral.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaisesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public PaisesController(ApplicationDbContext context) => _context = context;

        [HttpGet] // READ
        public async Task<ActionResult<IEnumerable<Pais>>> GetPaises() => await _context.Paises.ToListAsync();

        [HttpPost] // CREATE
        public async Task<ActionResult<Pais>> PostPais(Pais pais)
        {
            _context.Paises.Add(pais);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPaises), new { id = pais.PaisId }, pais);
        }

        [HttpPut("{id}")] // UPDATE
        public async Task<IActionResult> PutPais(int id, Pais pais)
        {
            if (id != pais.PaisId) return BadRequest();
            _context.Entry(pais).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")] // DELETE
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