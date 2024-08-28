import { Injectable } from '@angular/core';

const TOKEN = 'ecom-token';
const USER = 'ecom-user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public saveToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(TOKEN, token);
    }
  }

  public saveUser(user: any): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(USER, JSON.stringify(user));
    }
  }

  static getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(TOKEN);
    }
    return null;
  }

  static getUser(): any {
    if (typeof window !== 'undefined' && window.localStorage) {
      return JSON.parse(window.localStorage.getItem(USER) || '{}');
    }
    return null;
  }

  static getUserId(): string {
    const user = this.getUser();
    return user?.userId || '';
  }

  static getUserRole(): string {
    const user = this.getUser();
    return user?.role || '';
  }

  static isAdminLoggedIn(): boolean {
    const token = this.getToken();
    const role = this.getUserRole();
    return token !== null && role === 'ADMIN';
  }

  static isCustomerLoggedIn(): boolean {
    const token = this.getToken();
    const role = this.getUserRole();
    return token !== null && role === 'USER';
  }

  static signOut(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.removeItem(USER);
    }
  }
}

/*import { Injectable } from '@angular/core';

const TOKEN ='ecom-token';
const USER ='ecom-user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public saveToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.setItem(TOKEN, token);
    }
  }

  public saveUser(user): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(USER);
      window.localStorage.setItem(USER, JSON.stringify(user));
    }
  }

  static getToken(): string {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(TOKEN);
    }
    return null;
  }

  static getUser(): any {
    if (typeof window !== 'undefined' && window.localStorage) {
      return JSON.parse(window.localStorage.getItem(USER));
    }
    return null;
  }

  static getUserId(): string {
    const user = this.getUser();
    if (user == null) {
      return '';
    }
    return user.userId;
  }

  static getUserRole(): string {
    const user = this.getUser();
    if (user == null) {
      return '';
    }
    return user.role;
  }

  static isAdminLoggedIn(): boolean {
    const token = this.getToken();
    if (token == null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'ADMIN';
  }

  static isCustomerLoggedIn(): boolean {
    const token = this.getToken();
    if (token == null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'USER';
  }

  static signOut(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.removeItem(USER);
    }
  }
}*/
