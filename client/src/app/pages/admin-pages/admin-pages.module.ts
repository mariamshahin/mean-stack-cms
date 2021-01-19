import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { NgxSpinnerModule } from 'ngx-spinner';

import { AdminPagesRoutingModule } from "./admin-pages-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";


@NgModule({
  imports: [
    CommonModule,
    AdminPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  //  NgxSpinnerModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class AdminPagesModule { }
