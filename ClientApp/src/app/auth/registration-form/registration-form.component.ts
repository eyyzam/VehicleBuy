import { UserService } from "../auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html"
})
export class RegistrationFormComponent implements OnInit {
  constructor(public service: UserService) {}

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formModel.reset();
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case "DuplicateUserName":
                console.log(
                  "Username is already taken",
                  "Registration failed."
                );
                break;

              default:
                console.log(element.description, "Registration failed.");
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
