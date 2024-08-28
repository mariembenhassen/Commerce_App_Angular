import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent as AdminDashboardComponent } from '../admin/components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
 {path:'dashboard', component: AdminDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {




 }
