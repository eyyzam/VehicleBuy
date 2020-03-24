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
                entity.HasKey(e => e.AuctionId);
                entity.Property(e => e.AuctionId).HasColumnName("AuctionID");
                entity.Property(e => e.CarCategory).HasMaxLength(50).IsUnicode(false);
                entity.Property(e => e.CarBrand).HasMaxLength(50).IsUnicode(false);
                entity.Property(e => e.CarModel).HasMaxLength(50).IsUnicode(false);
                entity.Property(e => e.CarProductionYear).HasMaxLength(9).HasColumnType("int");
                entity.Property(e => e.CarMileage).HasMaxLength(9).HasColumnType("int");
                entity.Property(e => e.CarEngineType).HasMaxLength(50).IsUnicode(false);
                entity.Property(e => e.CarBodyType).HasMaxLength(50).IsUnicode(false);
                entity.Property(e => e.CarNumberOfSeats).HasMaxLength(2).HasColumnType("smallint");
                entity.Property(e => e.CarColor).HasMaxLength(20).IsUnicode(false);
                entity.Property(e => e.SellerEmail).HasMaxLength(50).IsUnicode(false);
                entity.Property(e => e.AuctionDescription).IsUnicode(false);
            });
        }
    }
}
