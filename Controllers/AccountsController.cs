using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using VehicleBuy.Data;
using VehicleBuy.Helpers;
using VehicleBuy.Models.DTO;
using VehicleBuy.Models.VM;

namespace VehicleBuy.Controllers
{
    [Route("api/[controller]")]
    public class AccountsController : Controller
    {

        private readonly AppDBCContext _appDBCContext;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public AccountsController(UserManager<AppUser> userManager, IMapper mapper, AppDBCContext appDBCContext)
        {
            _userManager = userManager;
            _mapper = mapper;
            _appDBCContext = appDBCContext;
        }

        // POST api/accounts
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdentity = _mapper.Map<AppUser>(model);
            var result = await _userManager.CreateAsync(userIdentity, model.Password);
            if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

            await _appDBCContext.Customers.AddAsync(new Customer { IdentityId = userIdentity.Id, Location = model.Location });
            await _appDBCContext.SaveChangesAsync();

            return new OkObjectResult("Account Created!");
        }
    }
}