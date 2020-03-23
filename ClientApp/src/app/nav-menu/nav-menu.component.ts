import { Component, OnInit, OnChanges } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";

interface LocalStorageUserInfo {
  fullname: string;
  email: string;
}

@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.css"]
})
export class NavMenuComponent implements OnInit {
  userLoggedIn: boolean = false;
  loggedUserInfo: LocalStorageUserInfo;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.userLocalStorage.subscribe(val => {
      if (val !== null) {
        this.loggedUserInfo = JSON.parse(localStorage.getItem("user"));
        this.userLoggedIn = true;
      } else {
        this.loggedUserInfo = null;
        this.userLoggedIn = false;
      }
    });
  }

  logout() {
    this.authService.userLogout();
    this.router.navigate(["login"]);
  }
}
