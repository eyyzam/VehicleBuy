import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, BehaviorSubject } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  apiUrl = "http://localhost:51220/api/auth/";
  userLocalStorage = new BehaviorSubject(this.userItem);

  constructor(private http: HttpClient) {}

  set userItem(value) {
    if (value !== null) {
      localStorage.setItem("user", value);
    }
    this.userLocalStorage.next(value);
  }

  get userItem() {
    return localStorage.getItem("user");
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "login", data).pipe(
      tap(_ => this.log("login")),
      catchError(this.handleError("login", []))
    );
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "register", data).pipe(
      tap(_ => this.log("register")),
      catchError(this.handleError("register", []))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }

  userLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.userItem = null;
  }
}
