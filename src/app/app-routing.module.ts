import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent as AdminDashboardComponent } from './admin/components/dashboard/dashboard.component';
import { DashboardComponent as CustomerDashboardComponent } from './customer/components/dashboard/dashboard.component';

const routes: Routes = [
  {path:'admin', loadChildren: ()=>import('./admin/admin.module').then(m =>m.AdminModule)},
  {path:'customer', loadChildren: ()=>import('./customer/customer.module').then(m =>m.CustomerModule)},
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'dashboard', component: CustomerDashboardComponent },
  {path:"login", component: LoginComponent},
  {path:"signup",component: SignupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
