import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';//hathy lazem t copyha 

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss']
})
export class PostCategoryComponent implements OnInit {
  // Define categoryForm as a property
  categoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder , 
    private router: Router,
    private adminService : AdminService ,
  private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // Initialize categoryForm with a form group and validators
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]

    });
  }

  // Method to handle form submission
  addCategory(): void {
    if (this.categoryForm.valid) {
     this.adminService.addCategory(this.categoryForm.value).subscribe(
      (res)=>{
        if (res.id != null){
          this.snackBar.open('Category Posted Successfully!', 'Close', {
            duration: 5000
          });
          this.router.navigateByUrl('/admin/dashboard');
        }else{
          this.snackBar.open(res.message, 'Close' , {
            duration: 5000,
            panelClass:'error-snackbar'
          });
        }
      }
    )
    } else{
      this.categoryForm.markAllAsTouched();
    }
  }
}
