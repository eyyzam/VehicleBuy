using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VehicleBuy.Models
{
    [Table("Auctions")]
    public class tblAuctions
    {
        [Key]
        public int AuctionId { get; set; }
        public string CarCategory { get; set; }
        public string CarBrand { get; set; }
        public string CarModel { get; set; }
        public int CarProductionYear { get; set; }
        public int CarMileage { get; set; }
        public string CarEngineType { get; set; }
        public int CarNumberOfSeats { get; set; }
        public string CarColor { get; set; }
        public string SellerEmail { get; set; }
        public string AuctionDescription { get; set; }
    }
}
