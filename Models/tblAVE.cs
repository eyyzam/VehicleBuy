using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using VehicleBuy.DTO;

namespace VehicleBuy.Models
{
    [Table("VehiclesEquipment")]
    public class tblAVE
    {
        [Key]
        public int equipmentId { get; set; }
        public int vehicleId { get; set; }
        public string equipmentName { get; set; }

        [ForeignKey("vehicleId")]
        public virtual VehicleDTO carId { get; set; }
    }
}
