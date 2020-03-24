using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            var auction = await _context.TblAuction.FirstOrDefaultAsync(m => m.AuctionId == id);
            if (auction == null) return NotFound();
            return auction;
        }

        [HttpPost]
        public async Task<ActionResult<tblAuctions>> CreateAuction([FromBody]AuctionDTO model)
        {
            if (ModelState.IsValid)
            {
                var auctionToCreate = _mapper.Map<tblAuctions>(model);
                _context.TblAuction.Add(auctionToCreate);
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetAuction", new { AuctionId = model.AuctionId }, model);
            }
            return BadRequest();
        }

        [HttpPut]
        public async Task<IActionResult> EditAuction([FromBody]AuctionDTO auction)
        {
            _context.Entry(auction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AuctionExists(auction.AuctionId))
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
        public async Task<IActionResult> DeleteAuction([FromBody]AuctionDTO auction)
        {
            var auct= await _context.TblAuction.FindAsync(auction.AuctionId);
            if (auct == null) return NotFound();
            _context.TblAuction.Remove(auct);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool AuctionExists(long id)
        {
            return _context.TblAuction.Any(e => e.AuctionId == id);
        }
    }
}