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
import { MatRadioModule } from "@angular/material/radio";

import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { TokenInterceptor } from "./auth/interceptors/token.interceptor";
import { BookComponent } from "./book/book.component";
import { AuctionService } from "./auction/auction.service";
import { AuctionComponent } from "./auction/auction.component";
import { AuctionCreateComponent } from "./auction/create/auction-create.component";
import { AuctionCreateDetailsComponent } from "./auction/create/details/details.component";

import { CKEditorModule } from "@ckeditor/ckeditor5-angular";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    LoginComponent,
    RegisterComponent,
    BookComponent,
    HomeComponent,
    AuctionComponent,
    AuctionCreateComponent,
    AuctionCreateDetailsComponent
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
    MatRadioModule,
    CKEditorModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, data: { title: "Main Page" } },
      {
        path: "book",
        component: BookComponent,
        data: { title: "List of Books" }
      },
      { path: "login", component: LoginComponent, data: { title: "Login" } },
      {
        path: "register",
        component: RegisterComponent,
        data: { title: "Register" }
      },
      { path: "home", component: HomeComponent },
      {
        path: "auctions",
        component: AuctionComponent,
        data: { title: "Auctions" }
      },
      {
        path: "auctions/new",
        component: AuctionCreateComponent,
        data: { title: "New Auction" }
      },
      {
        path: "auctions/new/details/:id",
        component: AuctionCreateDetailsComponent,
        data: { title: "Provide more details on what you are selling" }
      },
      {
        path: "edit/:id",
        component: AuctionComponent,
        data: { title: "Auction Edit" }
      }
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuctionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
