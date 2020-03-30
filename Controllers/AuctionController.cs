using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using System;
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
        public async Task<ActionResult<VehicleDTO>> GetAuction(long? id)
        {
            if (id == null) return NotFound();
            var vehicle = await _context.TblVehicles.FirstOrDefaultAsync(m => m.vehicleId == id);
            if (vehicle == null) return NotFound();
            var vehicleId = vehicle.vehicleId;
            var equipment = await _context.TblAVE.Where(x => vehicleId == id).ToListAsync();
            /*equipment.Select(x => vehicleId == id);*/
            var x = _mapper.Map<VehicleDTO>(vehicle);
            x.vehicleEquipment = equipment;
            return x;
           /* if (id == null) return NotFound();
            var auction = await _context.TblAuction.FirstOrDefaultAsync(m => m.auctionId == id);
            if (auction == null) return NotFound();
            var equipment = await _context.TblAVE.Where(x => Convert.ToInt32(x.carId) == Convert.ToInt32(id)).ToListAsync();
            auction.v
            var final = _mapper.Map<VehicleDTO>(auction);
            final.vehicleEquipment = equipment;
            return auction;*/
        }

        [HttpPost]
        public async Task<ActionResult> CreateAuction([FromBody]VehicleDTO model)
        {
            if (ModelState.IsValid)
            {
                var map = _mapper.Map<tblVehicles>(model);
                _context.TblVehicles.Add(map);
                await _context.SaveChangesAsync();
                foreach (tblAVE x in model.vehicleEquipment)
                {
                    x.vehicleId = map.vehicleId;
                    var ave = _mapper.Map<tblAVE>(x);
                    _context.TblAVE.Add(ave);
                    await _context.SaveChangesAsync();
                }
                return Ok(map.vehicleId.ToString());
            }
            else
            {
                var message = string.Join(" | ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
                return BadRequest(message);
            }
            /*if (ModelState.IsValid)
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
            }*/
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