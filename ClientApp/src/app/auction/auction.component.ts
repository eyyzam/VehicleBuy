import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-auction",
  templateUrl: "./auction.component.html"
})
export class AuctionComponent implements OnInit {
  productionYears: number[] = [];
  numberOfSeats: number[] = [];

  ngOnInit() {
    // Assign production years select options
    for (let i = 1950; i < 2020; i++) {
      let x = 0;
      this.productionYears[x] = i;
      x++;
    }
    // Asign number of seats select options
    for (let i = 0; i < 10; i++) {
      this.numberOfSeats[i] = i + 1;
    }
  }
}
