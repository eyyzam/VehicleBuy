using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VehicleBuy.Models
{
    [Table("Vehicles")]
    public class tblVehicles
    {
        [Key]
        public int vehicleId { get; set; }
        public string offerTitle { get; set; }
        public string vehicleCategory { get; set; }
        public string vehicleVIN { get; set; }
        public string vehicleBrand { get; set; }
        public string vehicleModel { get; set; }
        public int vehicleProductionYear { get; set; }
        public int vehicleMileage { get; set; }
        public string vehicleEngineType { get; set; }
        public string vehicleTransmission { get; set; }
        public string vehicleEngineInfo { get; set; }
        public string vehicleVersion { get; set; }
        public int vehicleNumberOfDoors { get; set; }
        public string vehicleColor { get; set; }
        public int vehiclePrice { get; set; }
        public string sellerEmail { get; set; }
        public string offerDescription { get; set; }
    }
}
