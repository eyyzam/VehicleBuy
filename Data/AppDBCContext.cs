using Microsoft.EntityFrameworkCore;
using VehicleBuy.Models.DTO;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace VehicleBuy.Data
{
    public class AppDBCContext : IdentityDbContext<AppUser>
    {
        public AppDBCContext(DbContextOptions options) : base(options) { }

        public DbSet<Customer> Customers { get; set; }
    }
}
