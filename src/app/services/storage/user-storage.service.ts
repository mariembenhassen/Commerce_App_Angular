import { Injectable } from '@angular/core';
import { stringify } from 'querystring';

//This UserStorageService class in Angular provides methods to save a token and user data to the browser's local storage.
const TOKEN ='ecom-token';
const USER ='ecom-user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public saveToken(token: string): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public saveUser(user): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }
  
}
