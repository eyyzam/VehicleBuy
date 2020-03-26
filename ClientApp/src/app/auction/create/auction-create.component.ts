import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuctionService } from "../auction.service";
import { Auction } from "../interface/auction.model";
import { Subscription } from "rxjs";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

@Component({
  selector: "app-auction-create",
  templateUrl: "./auction-create.component.html",
  styleUrls: ["./auction-create.component.css"]
})
export class AuctionCreateComponent implements OnInit {
  productionYears: number[] = [];
  numberOfSeats: number[] = [];
  auctionForm: FormGroup;
  formMode: string = "CREATE";
  auctionId: string;
  sellerEmail: string;
  isLoading: boolean = true;

  // Subscriptions
  fetchedAuctionSub: Subscription;

  constructor(
    private auctionService: AuctionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Assign production years select options
    for (let i = 0; i < 70; i++) {
      let year = 1951 + i;
      this.productionYears[i] = year;
    }

    // Asign number of seats select options
    for (let i = 0; i < 10; i++) {
      this.numberOfSeats[i] = i + 1;
    }

    // Setting validation for auctionForm
    this.auctionForm = new FormGroup({
      auctionCarCategory: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      }),
      auctionCarBrand: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      }),
      auctionCarModel: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      }),
      auctionCarProductionYear: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4)
        ]
      }),
      auctionCarMileage: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(7)]
      }),
      auctionCarEngineType: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(50)]
      }),
      auctionNumberOfSeats: new FormControl(null, {
        validators: [Validators.required]
      }),
      auctionCarColor: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      }),
      auctionDescription: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      })
    });

    // Determine whether property ID exists in the URL
    // if ID exists set fetched object to form values
    this.route.paramMap.subscribe((p: ParamMap) => {
      if (p.has("id")) {
        this.formMode = "EDIT";
        this.auctionId = p.get("id");
        this.fetchedAuctionSub = this.auctionService
          .getAuction(this.auctionId)
          .subscribe(res => {
            this.sellerEmail = res.sellerEmail;
            this.auctionForm.setValue({
              auctionCarCategory: res.auctionId,
              auctionCarBrand: res.carBrand,
              auctionCarModel: res.carModel,
              auctionCarProductionYear: res.carProductionYear,
              auctionCarMileage: res.carMileage,
              auctionCarEngineType: res.carEngineType,
              auctionNumberOfSeats: res.carNumberOfSeats,
              auctionCarColor: res.carColor,
              auctionDescription: res.auctionDescription
            });
          });
      }
    });
  }

  onAuctionSubmit() {
    // When form properties does not pass the validation method returns
    // User will see all the validation errors
    if (this.auctionForm.invalid) return;
    let loggedUserInfo = JSON.parse(localStorage.getItem("user"));
    let auctionData: Auction = {
      auctionId: this.formMode === "EDIT" ? parseInt(this.auctionId) : null,
      carCategory: this.auctionForm.value.auctionCarCategory,
      carBrand: this.auctionForm.value.auctionCarBrand,
      carModel: this.auctionForm.value.auctionCarModel,
      carProductionYear: this.auctionForm.value.auctionCarProductionYear,
      carMileage: this.auctionForm.value.auctionCarMileage,
      carEngineType: this.auctionForm.value.auctionCarEngineType,
      carNumberOfSeats: this.auctionForm.value.auctionNumberOfSeats,
      carColor: this.auctionForm.value.auctionCarColor,
      sellerEmail: loggedUserInfo.email,
      auctionDescription: this.auctionForm.value.auctionDescription
    };
    if (this.formMode === "EDIT") {
    } else {
      this.auctionService.addAuction(auctionData).subscribe(id => {
        this.router.navigate(["/auctions/new/details/" + id]);
      });
    }
    this.auctionForm.reset();
  }

  ngOnDestroy() {
    if (this.fetchedAuctionSub) this.fetchedAuctionSub.unsubscribe();
  }
}
