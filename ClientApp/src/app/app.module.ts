import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";

// Angular Material Components
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTableModule } from "@angular/material/table";
import { MatMenuModule } from "@angular/material/menu";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { UserComponent } from "./auth/user.component";
import { RegistrationFormComponent } from "./auth/registration-form/registration-form.component";
import { LoginFormComponent } from "./auth/login-form/login-form.component";
import { AuthGuard } from "./auth/guards/auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    UserComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    // Angular Material
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTableModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: "", redirectTo: "/user/login", pathMatch: "full" },
      {
        path: "user",
        component: UserComponent,
        children: [
          { path: "registration", component: RegistrationFormComponent },
          { path: "login", component: LoginFormComponent }
        ]
      },
      { path: "home", component: HomeComponent, canActivate: [AuthGuard] }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
