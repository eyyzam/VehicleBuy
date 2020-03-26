import { Component, OnInit } from "@angular/core";
import { AuctionService } from "../../auction.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
import { PossibleVehicleEquipment } from "../../../data/possibleVehicleEquipment";
import * as DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

@Component({
  selector: "app-auction-create-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"]
})
export class AuctionCreateDetailsComponent implements OnInit {
  public Editor = DecoupledEditor;
  public onReady(editor) {
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
  }
  sectionTitle: string = "Dodaj ogłoszenie";
  productionYears: number[] = [];
  numberOfSeats: number[] = [];
  isLoading: boolean = true;
  messageToUser: string = "";
  auctionSub: Subscription;
  possibleVehicleEquipment = PossibleVehicleEquipment;
  offerDescription: string = "";

  constructor(
    private auctionService: AuctionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Assign production years select options
    for (let i = 0; i < 70; i++) {
      let year = 1951 + i;
      this.productionYears[i] = year;
    }

    // Asign number of seats select options
    for (let i = 0; i < 5; i++) {
      this.numberOfSeats[i] = i + 1;
    }

    this.auctionSub = this.route.paramMap.subscribe((p: ParamMap) => {
      if (p.has("id")) {
        this.auctionService.getAuction(p.get("id")).subscribe(auction => {
          console.log(auction);
        });
      } else {
        this.isLoading = true;
        this.messageToUser = "No auctionId provided. Invalid request";
      }
    });
  }

  onFormSubmit() {}
}
