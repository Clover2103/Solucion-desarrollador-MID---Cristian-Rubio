using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GestionIntegral.API.Data;
using GestionIntegral.API.Models;

namespace GestionIntegral.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartamentosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public DepartamentosController(ApplicationDbContext context) => _context = context;

        [HttpGet("porpais/{paisId}")] // READ (Filtrado)
        public async Task<ActionResult<IEnumerable<Departamento>>> GetPorPais(int paisId) 
            => await _context.Departamentos.Where(d => d.PaisId == paisId).ToListAsync();

        [HttpPost] // CREATE
        public async Task<ActionResult<Departamento>> PostDepartamento(Departamento depto)
        {
            _context.Departamentos.Add(depto);
            await _context.SaveChangesAsync();
            return Ok(depto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDepto(int id, Departamento depto)
        {
            if (id != depto.DepartamentoId) return BadRequest();
            _context.Entry(depto).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")] // DELETE
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