import { Component, OnInit } from "@angular/core";
import { VehicleService } from "../vehicles.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { PossibleVehicleEquipment } from "../data/possibleVehicleEquipment";
import * as DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdditionalVehicleEquipment } from "../models/additionalVehicleEquipment.model";
import { Vehicle } from "../models/vehicle.model";
import { MatCheckboxChange } from "@angular/material";

@Component({
  selector: "app-vehicles-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"]
})
export class VehicleCreateComponent implements OnInit {
  // CKEditor 5
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
  // Form assignment, arrays and properties
  NewVehicleForm: FormGroup;
  productionYears: number[] = [];
  numberOfDoors: number[] = [];
  possibleVehicleEquipment = PossibleVehicleEquipment;
  offerDescription: string = "";

  // Form Mode either CREATE or EDIT
  formMode: string = "CREATE";

  // Loading property indicatior
  isLoading: boolean = true;

  // When invalid URL this property stores information
  messageToUser: string = "";

  // Protected properties that does not exist in the form
  // Those need to be store that way
  protected vehicleId: number;
  protected vehicleEquipment: AdditionalVehicleEquipment[] = [];
  protected sellerEmail: string;

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Assign production years select options
    for (let i = 0; i < 70; i++) {
      let year = 1951 + i;
      this.productionYears[i] = year;
    }

    // Asign number of doors select options
    for (let i = 0; i < 5; i++) {
      this.numberOfDoors[i] = i + 1;
    }

    // Form validation
    this.NewVehicleForm = new FormGroup({
      offerTitle: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(128)
        ]
      }),
      vehicleCategory: new FormControl(null, {
        validators: [Validators.required]
      }),
      vehicleVIN: new FormControl(null, {
        validators: [Validators.minLength(17), Validators.maxLength(17)]
      }),
      vehicleBrand: new FormControl(null, {
        validators: [Validators.required]
      }),
      vehicleModel: new FormControl(null, {
        validators: [Validators.required]
      }),
      vehicleProductionYear: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.min(1951),
          Validators.max(2020)
        ]
      }),
      vehicleMileage: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(7)]
      }),
      vehicleEngineType: new FormControl(null, {
        validators: [Validators.required]
      }),
      vehicleTransmission: new FormControl(null, {
        validators: [Validators.required]
      }),
      vehicleEngineInfo: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64)
        ]
      }),
      vehicleVersion: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64)
        ]
      }),
      vehicleNumberOfDoors: new FormControl(null, {
        validators: [Validators.required, Validators.min(1), Validators.max(7)]
      }),
      vehicleColor: new FormControl(null, {
        validators: [Validators.required]
      }),
      vehiclePrice: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.min(1),
          Validators.max(10000000)
        ]
      })
    });

    // Determine whether property ID exists in the URL
    // if ID exists set fetched object to form values
    this.route.paramMap.subscribe((p: ParamMap) => {
      if (p.has("id")) {
        this.formMode = "EDIT";
        this.vehicleId = parseInt(p.get("id"));
        this.vehicleService.getVehicle(this.vehicleId).subscribe(res => {
          // For received Vehicle set form properties where these exist
          this.NewVehicleForm.setValue({
            offerTitle: res.offerTitle,
            vehicleCategory: res.vehicleCategory,
            vehicleVIN: res.vehicleVIN,
            vehicleBrand: res.vehicleBrand,
            vehicleModel: res.vehicleModel,
            vehicleProductionYear: res.vehicleProductionYear,
            vehicleMileage: res.vehicleMileage,
            vehicleEngineType: res.vehicleEngineType,
            vehicleTransmission: res.vehicleTransmission,
            vehicleEngineInfo: res.vehicleEngineInfo,
            vehicleVersion: res.vehicleVersion,
            vehicleNumberOfDoors: res.vehicleNumberOfDoors,
            vehicleColor: res.vehicleColor,
            vehiclePrice: res.vehiclePrice
          });
          // For the rest store those in the protected local variables
          this.vehicleEquipment = res.vehicleEquipment;
          this.sellerEmail = res.sellerEmail;
          this.offerDescription = res.offerDescription;
        });
      }
    });
  }

  onFormSubmit() {
    // If form does not pass validation unable to contact with service
    if (this.NewVehicleForm.invalid) return;
    // localStorage["user"] = { email, fullname }
    let loggedUserInfo = JSON.parse(localStorage.getItem("user"));
    let vehicleData = new Vehicle(
      this.formMode === "EDIT" ? this.vehicleId : null,
      this.NewVehicleForm.value.offerTitle,
      this.NewVehicleForm.value.vehicleCategory,
      this.NewVehicleForm.value.vehicleVIN,
      this.NewVehicleForm.value.vehicleBrand,
      this.NewVehicleForm.value.vehicleModel,
      this.NewVehicleForm.value.vehicleProductionYear,
      this.NewVehicleForm.value.vehicleMileage,
      this.NewVehicleForm.value.vehicleEngineType,
      this.NewVehicleForm.value.vehicleTransmission,
      this.NewVehicleForm.value.vehicleEngineInfo,
      this.NewVehicleForm.value.vehicleVersion,
      this.NewVehicleForm.value.vehicleNumberOfDoors,
      this.NewVehicleForm.value.vehicleColor,
      this.NewVehicleForm.value.vehiclePrice,
      this.vehicleEquipment,
      // Here let's say that admin wants to edit this vehicle
      // So sellerEmail stays the same after edition
      this.formMode === "EDIT" ? this.sellerEmail : loggedUserInfo.email,
      this.offerDescription
    );

    if (this.formMode === "EDIT") {
      // TODO CALL EDIT SEVICE
    } else {
      console.log(vehicleData);
      // this.vehicleService.addVehicle(vehicleData).subscribe(id => {
      //   this.router.navigate(["/vehicles/details/" + id]);
      // });
    }
  }

  equipmentManager(
    $event: MatCheckboxChange,
    eqData: AdditionalVehicleEquipment
  ) {
    if ($event.source.name === "eq") {
      if ($event.source.checked) {
        this.vehicleEquipment.push(eqData);
      } else {
        const index = this.vehicleEquipment.findIndex(x => x === eqData);
        this.vehicleEquipment.splice(index, 1);
      }
    }
  }
}
