using System.ComponentModel.DataAnnotations;

namespace VehicleBuy.DTO
{
    public class AdditionalVehicleEquipmentDTO
    {
        [Required]
        public int equipmentId { get; set; }
        [Required]
        public int vehicleId { get; set; }
        [Required]
        public string equipmentName { get; set; }
    }
}
