using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using VehicleBuy.Models;

namespace VehicleBuy.DTO
{
    public class VehicleDTO
    {
        [Key]
        public int vehicleId { get; set; }
        [Required]
        public string offerTitle { get; set; }
        [Required]
        public string vehicleCategory { get; set; }
        [Required]
        public string vehicleVIN { get; set; }
        [Required]
        public string vehicleBrand { get; set; }
        [Required]
        public string vehicleModel { get; set; }
        [Required]
        public int vehicleProductionYear { get; set; }
        [Required]
        public int vehicleMileage { get; set; }
        [Required]
        public string vehicleEngineType { get; set; }
        [Required]
        public string vehicleTransmission { get; set; }
        [Required]
        public string vehicleEngineInfo { get; set; }
        [Required]
        public string vehicleVersion { get; set; }
        [Required]
        public int vehicleNumberOfDoors { get; set; }
        [Required]
        public string vehicleColor { get; set; }
        [Required]
        public int vehiclePrice { get; set; }
        [Required]
        public List<tblAVE> vehicleEquipment { get; set; }
        [Required]
        public string sellerEmail { get; set; }
        [Required]
        public string offerDescription { get; set; }
    }
}
