using System.ComponentModel.DataAnnotations;

namespace VehicleBuy.DTO
{
    public class AuctionDTO
    {
        [Required]
        public string carCategory { get; set; }

        [Required]
        public string carBrand { get; set; }

        [Required]
        public string carModel { get; set; }

        [Required]
        public int carProductionYear { get; set; }

        [Required]
        public int carMileage { get; set; }

        [Required]
        public string carEngineType { get; set; }

        [Required]
        public int carNumberOfSeats { get; set; }

        [Required]
        public string carColor { get; set; }

        [Required]
        public string sellerEmail { get; set; }

        [Required]
        public string auctionDescription { get; set; }
    }
}
