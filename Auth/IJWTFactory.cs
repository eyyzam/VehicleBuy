using System.Security.Claims;
using System.Threading.Tasks;

namespace VehicleBuy.Auth
{
    public interface IJWTFactory
    {
        Task<string> GenerateEncodedToken(string userName, ClaimsIdentity identity);
        ClaimsIdentity GenerateClaimsIdentity(string userName, string id);
    }
}
