
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStorageService } from '../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(email, password).subscribe(
      (isLoggedIn) => {
        if (isLoggedIn) {
          if (UserStorageService.isAdminLoggedIn()) {
            this.router.navigateByUrl('admin/dashboard');
          } else if (UserStorageService.isCustomerLoggedIn()) {
            this.router.navigateByUrl('customer/dashboard');
          }
        } else {
          this.snackBar.open('Login failed', 'ERROR', { duration: 5000 });
        }
      },
      (error) => {
        this.snackBar.open('Bad credentials', 'ERROR', { duration: 5000 });
      }
    );
  }

  logout(): void {
    UserStorageService.signOut();
    this.router.navigateByUrl('/login'); // Redirect to login page after logout
  }
}

/*
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup
  hidePassword = true;
  
  constructor(private fb: FormBuilder ,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
     
  
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({ 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    const username = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
  
    this.authService.login(username, password).subscribe(
      (isLoggedIn) => {
        console.log('Login status:', isLoggedIn);
        console.log('Is Admin Logged In:', UserStorageService.isAdminLoggedIn());
        console.log('Is Customer Logged In:', UserStorageService.isCustomerLoggedIn());
        
        if (isLoggedIn) {
          if (UserStorageService.isAdminLoggedIn()) {
            this.router.navigateByUrl('admin/dashboard');
          } else if (UserStorageService.isCustomerLoggedIn()) {
            this.router.navigateByUrl('customer/dashboard');
          }
        } else {
          this.snackBar.open('Login failed', 'ERROR', { duration: 5000 });
        }
      },
      (error) => {
        this.snackBar.open('Bad credentials', 'ERROR', { duration: 5000 });
      }
    );
  }
  
}*/
