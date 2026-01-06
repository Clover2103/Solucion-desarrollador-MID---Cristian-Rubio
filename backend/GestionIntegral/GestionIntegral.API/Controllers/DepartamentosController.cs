using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GestionIntegral.API.Data;
using GestionIntegral.API.Models;

namespace GestionIntegral.API.Controllers
{
    [Route("api/Departamentos")] // Ruta explícita para evitar el 404 de Angular
    [ApiController]
    public class DepartamentosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public DepartamentosController(ApplicationDbContext context) => _context = context;

        [HttpGet] // Agregado para evitar error 405 en pruebas de navegador
        public async Task<ActionResult<IEnumerable<Departamento>>> Get()
            => await _context.Departamentos.ToListAsync();

        [HttpGet("porpais/{paisId}")]
        public async Task<ActionResult<IEnumerable<Departamento>>> GetPorPais(int paisId)
            => await _context.Departamentos.Where(d => d.PaisId == paisId).ToListAsync();

        [HttpPost]
        public async Task<ActionResult<Departamento>> PostDepartamento(Departamento depto)
        {
            depto.Pais = null; // Evita que EF intente re-insertar el país
            _context.Departamentos.Add(depto);
            await _context.SaveChangesAsync();
            return Ok(depto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDepto(int id, Departamento depto)
        {
            if (depto.DepartamentoId == 0) depto.DepartamentoId = id;
            if (id != depto.DepartamentoId) return BadRequest("IDs no coinciden");

            var deptoDb = await _context.Departamentos.FindAsync(id);
            if (deptoDb == null) return NotFound();

            deptoDb.Nombre = depto.Nombre;
            deptoDb.PaisId = depto.PaisId;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepto(int id)
        {
            var depto = await _context.Departamentos.FindAsync(id);
            if (depto == null) return NotFound();
            _context.Departamentos.Remove(depto);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}