using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VehicleBuy.DTO;
using VehicleBuy.Models;

namespace VehicleBuy.Controllers
{
    public class AuctionController : Controller
    {
        private readonly BookStoreContext _context;
        private readonly IMapper _mapper;

        public AuctionController(BookStoreContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET /Auction
        [HttpGet]
        public async Task<ActionResult<IEnumerable<tblAuctions>>> Index()
        {
            return await _context.TblAuction.ToListAsync();
        }

        [HttpGet]
        public async Task<ActionResult<tblAuctions>> GetAuction(long? id)
        {
            if (id == null) return NotFound();
            var auction = await _context.TblAuction.FirstOrDefaultAsync(m => m.auctionId == id);
            if (auction == null) return NotFound();
            return auction;
        }

        [HttpPost]
        public async Task<ActionResult> CreateAuction([FromBody]AuctionDTO model)
        {
            if (ModelState.IsValid)
            {
                var ma = _mapper.Map<tblAuctions>(model);
                _context.TblAuction.Add(ma);
                await _context.SaveChangesAsync();
                return Ok(ma.auctionId.ToString());
            }
            else
            {
                var message = string.Join(" | ", ModelState.Values
               .SelectMany(v => v.Errors)
               .Select(e => e.ErrorMessage));
                return BadRequest();
            }
        }

        [HttpPut]
        public async Task<IActionResult> EditAuction([FromBody]tblAuctions auction)
        {
            _context.Entry(auction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AuctionExists(auction.auctionId))
                {
                    return NotFound();
                } else
                {
                    throw;
                }
            }
            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> DeleteAuction([FromBody]tblAuctions auction)
        {
            var auct= await _context.TblAuction.FindAsync(auction.auctionId);
            if (auct == null) return NotFound();
            _context.TblAuction.Remove(auct);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool AuctionExists(long id)
        {
            return _context.TblAuction.Any(e => e.auctionId == id);
        }
    }
}