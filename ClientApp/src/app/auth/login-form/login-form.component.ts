import { UserService } from "../auth.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html"
})
export class LoginFormComponent implements OnInit {
  formModel = {
    UserName: "",
    Password: ""
  };
  constructor(private service: UserService, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem("token") != null)
      this.router.navigateByUrl("/home");
  }

  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe((res: any) => {
      localStorage.setItem("token", res.token);
      this.router.navigateByUrl("/home");
    });
  }
}
