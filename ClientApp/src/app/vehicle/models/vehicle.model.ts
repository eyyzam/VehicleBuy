import { AdditionalVehicleEquipment } from "./additionalVehicleEquipment.model";

export class Vehicle {
  constructor(
    public vehicleId: number, // NOT IN FORM
    public offerTitle: string,
    public vehicleCategory: string,
    public vehicleVIN: string,
    public vehicleBrand: string,
    public vehicleModel: string,
    public vehicleProductionYear: number,
    public vehicleMileage: number,
    public vehicleEngineType: string,
    public vehicleTransmission: string,
    public vehicleEngineInfo: string,
    public vehicleVersion: string,
    public vehicleNumberOfDoors: number,
    public vehicleColor: string,
    public vehiclePrice: string,
    public vehicleEquipment: AdditionalVehicleEquipment[], // NOT IN FORM
    public sellerEmail: string, // NOT IN FORM
    public offerDescription: string // NOT IN FORM
  ) {}
}
