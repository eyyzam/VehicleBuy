import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Auction } from "./interface/auction.model";

@Injectable({
  providedIn: "root"
})
export class AuctionService {
  constructor(private httpClient: HttpClient) {}

  getAuction(id: string) {
    return this.httpClient.get<Auction>(
      "http://localhost:51220/Auction/GetAuction/" + id
    );
  }

  addAuction(data: Auction) {
    return this.httpClient.post<string>(
      "http://localhost:51220/Auction/CreateAuction",
      data
    );
  }

  deleteAuction(auction: Auction) {
    return this.httpClient.post(
      "http://localhost:51220/Auction/DeleteAuction",
      auction
    );
  }
}
