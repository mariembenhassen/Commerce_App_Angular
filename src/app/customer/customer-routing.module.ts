import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { DashboardComponent as CustomerDashboardComponent } from '../customer/components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: CustomerComponent },
  {path:'dashboard', component: CustomerDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
