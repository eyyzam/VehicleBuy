using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VehicleBuy.DTO
{
    [Table("Auctions")]
    public class AuctionDTO
    {
        public int AuctionId { get; set; }

        [Required]
        [StringLength(50, MinimumLength =3, ErrorMessage ="Invalid Category")]
        public string CarCategory { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Invalid Brand")]
        public string CarBrand { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Invalid Model")]
        public string CarModel { get; set; }

        [Required]
        [StringLength(9, MinimumLength = 3, ErrorMessage = "Invalid Production Year")]
        public int CarProductionYear { get; set; }

        [Required]
        [StringLength(9, MinimumLength = 3, ErrorMessage = "Invalid Vehicle Mileage")]
        public int CarMileage { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Invalid Engine Type")]
        public string CarEngineType { get; set; }

        [Required]
        [StringLength(9, MinimumLength = 3, ErrorMessage = "Invalid Category")]
        public int CarNumberOfSeats { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Invalid Color")]
        public string CarColor { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Invalid Seller Email")]
        public string SellerEmail { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Invalid Description")]
        public string AuctionDescription { get; set; }
    }
}
