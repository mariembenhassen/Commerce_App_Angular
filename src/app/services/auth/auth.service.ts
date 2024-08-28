import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserStorageService } from '../storage/user-storage.service';

const BASIC_URL = "http://localhost:8082/api/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private userStorageService: UserStorageService) { }

  register(signupRequest: any): Observable<any> {
    return this.http.post(BASIC_URL + "sign-up", signupRequest);
  }

  login(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { username, password };

    return this.http.post(BASIC_URL + "authenticate", body, { headers, observe: 'response' }).pipe(
      map((res: any) => {
        const token = res.headers.get('authorization')?.substring(7);
        const user = res.body;
        if (token && user) {
          this.userStorageService.saveToken(token);
          this.userStorageService.saveUser(user);
          return true;
        }
        return false;
      }),
      catchError((error) => {
        console.error('Login failed', error);
        return throwError(() => new Error('Login failed. Please try again.'));
      })
    );
  }
}
