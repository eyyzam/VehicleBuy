using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VehicleBuy.Models
{
    [Table("Auctions")]
    public class tblAuctions
    {
        [Key]
        public int auctionId { get; set; }
        public string carCategory { get; set; }
        public string carBrand { get; set; }
        public string carModel { get; set; }
        public int carProductionYear { get; set; }
        public int carMileage { get; set; }
        public string carEngineType { get; set; }
        public int carNumberOfSeats { get; set; }
        public string carColor { get; set; }
        public string sellerEmail { get; set; }
        public string auctionDescription { get; set; }
    }
}
