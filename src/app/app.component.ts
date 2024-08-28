import { Component } from '@angular/core';
import { UserStorageService } from './services/storage/user-storage.service'; // Adjust the path as needed

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // Static methods should be called on the class itself
  isCustomerLoggedIn(): boolean {
    return UserStorageService.isCustomerLoggedIn();
  }

  isAdminLoggedIn(): boolean {
    return UserStorageService.isAdminLoggedIn();
  }

  logout(): void {
    UserStorageService.signOut();
    // Optionally navigate to login page or refresh the current page
  }
}
