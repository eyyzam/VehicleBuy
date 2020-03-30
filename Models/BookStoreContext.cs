using Microsoft.EntityFrameworkCore;

namespace VehicleBuy.Models
{
    public partial class BookStoreContext : DbContext
    {
        public BookStoreContext()
        {
        }

        public BookStoreContext(DbContextOptions<BookStoreContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblBook> TblBook { get; set; }
        public virtual DbSet<TblUser> TblUser { get; set; }
        public virtual DbSet<tblAuctions> TblAuction { get; set; }
        public virtual DbSet<tblVehicles> TblVehicles { get; set; }
        public virtual DbSet<tblAVE> TblAVE { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=.;Database=BookStore;Trusted_Connection=True;User Id=sa;Password=q;Integrated Security=false;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TblBook>(entity =>
            {
                entity.HasKey(e => e.BookId);

                entity.Property(e => e.BookId).HasColumnName("BookID");

                entity.Property(e => e.Author)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Isbn)
                    .HasColumnName("ISBN")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Price).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.Publisher)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblUser>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FullName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password).HasMaxLength(128);

                entity.Property(e => e.Salt).HasMaxLength(128);
            });

            modelBuilder.Entity<tblAuctions>(entity =>
            {
                entity.HasKey(e => e.auctionId);
                entity.Property(e => e.carCategory).HasMaxLength(50).IsUnicode(false);
                entity.Property(e => e.carBrand).HasMaxLength(50).IsUnicode(false);
                entity.Property(e => e.carModel).HasMaxLength(50).IsUnicode(false);
                entity.Property(e => e.carProductionYear).HasMaxLength(9).HasColumnType("int");
                entity.Property(e => e.carMileage).HasMaxLength(9).HasColumnType("int");
                entity.Property(e => e.carEngineType).HasMaxLength(50).IsUnicode(false);
                entity.Property(e => e.carNumberOfSeats).HasMaxLength(2).HasColumnType("smallint");
                entity.Property(e => e.carColor).HasMaxLength(20).IsUnicode(false);
                entity.Property(e => e.sellerEmail).HasMaxLength(50).IsUnicode(false);
                entity.Property(e => e.auctionDescription).IsUnicode(false);
            });

            modelBuilder.Entity<tblVehicles>(entity =>
            {
                entity.HasKey(e => e.vehicleId);
                entity.Property(e => e.offerTitle).HasMaxLength(128).IsUnicode(false);
                entity.Property(e => e.vehicleCategory).HasMaxLength(64).IsUnicode(false);
                entity.Property(e => e.vehicleVIN).HasMaxLength(64).IsUnicode(false);
                entity.Property(e => e.vehicleBrand).HasMaxLength(64).IsUnicode(false);
                entity.Property(e => e.vehicleModel).HasMaxLength(64).IsUnicode(false);
                entity.Property(e => e.vehicleProductionYear).HasMaxLength(4).HasColumnType("int");
                entity.Property(e => e.vehicleMileage).HasMaxLength(7).HasColumnType("int");
                entity.Property(e => e.vehicleEngineType).HasMaxLength(64).IsUnicode(false);
                entity.Property(e => e.vehicleTransmission).HasMaxLength(64).IsUnicode(false);
                entity.Property(e => e.vehicleEngineInfo).HasMaxLength(64).IsUnicode(false);
                entity.Property(e => e.vehicleVersion).HasMaxLength(64).IsUnicode(false);
                entity.Property(e => e.vehicleNumberOfDoors).HasMaxLength(2).HasColumnType("int");
                entity.Property(e => e.vehicleColor).HasMaxLength(64).IsUnicode(false);
                entity.Property(e => e.vehiclePrice).HasMaxLength(8).HasColumnType("int");
                entity.Property(e => e.sellerEmail).HasMaxLength(64).IsUnicode(false);
                entity.Property(e => e.offerDescription).IsUnicode(false);
            });
        }
    }
}
