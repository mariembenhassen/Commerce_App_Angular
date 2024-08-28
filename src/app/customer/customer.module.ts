import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { DemoAngularMaterailModule } from '../DemoAngularMaterialModule';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerComponent } from './customer.component';



@NgModule({
  declarations: [
   CustomerComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    DemoAngularMaterailModule,
   
  ]
})
export class CustomerModule { }
