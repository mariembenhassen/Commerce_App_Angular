import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar  } from '@angular/material/snack-bar';
import { error } from 'console';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder ,
    private snackBar: MatSnackBar,
    private authSerrvice: AuthService,
    private router: Router,
     
  
  ) {

  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      return; // Prevent submission if the form is invalid.
    }
  
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
  
    if (password !== confirmPassword) {
      this.snackBar.open('Passwords do not match.', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
      return;
    }
  
    this.authSerrvice.register(this.signupForm.value).subscribe(
      (response) => {
        this.snackBar.open('Sign up successful!', 'Close', { duration: 5000 });
        this.router.navigateByUrl("/login");
      },
      (error) => {
        this.snackBar.open('Sign up failed. Please try again.', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
      }
    );
  }
  
}
