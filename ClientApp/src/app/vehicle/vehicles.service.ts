import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Vehicle } from "./models/vehicle.model";

@Injectable({
  providedIn: "root"
})
export class VehicleService {
  constructor(private httpClient: HttpClient) {}

  getVehicle(id: number) {
    return this.httpClient.get<Vehicle>(
      "http://localhostt:51220/Auction/GetAuction/" + id
    );
  }

  addVehicle(data: Vehicle) {
    return this.httpClient.post<string>(
      "http://localhost:51220/Auction/CreateAuction",
      data
    );
  }
}
