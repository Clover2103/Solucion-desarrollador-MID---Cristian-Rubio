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

        public DepartamentosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Departamentos/porpais/1
        [HttpGet("porpais/{paisId}")]
        public async Task<ActionResult<IEnumerable<Departamento>>> GetDepartamentosPorPais(int paisId)
        {
            return await _context.Departamentos
                .Where(d => d.PaisId == paisId)
                .ToListAsync();
        }
    }
}