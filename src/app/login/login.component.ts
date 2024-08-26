import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';  //par defaut angular ta3tyk express dima badelha

import { AuthService } from '../services/auth/auth.service';
import {MatSnackBar  } from '@angular/material/snack-bar';

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
    private authSerrvice: AuthService,
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

    this.authSerrvice.login(username , password).subscribe(
    (res) => {
      this.snackBar.open(' Login  successful!', 'Ok', { duration: 5000 });
      
    (error) => {
      this.snackBar.open('Login failed. Please try again.', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
    }
  
    
}
    )
  }
}
