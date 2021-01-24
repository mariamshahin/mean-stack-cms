import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DashboardAccessRoutingModule } from './dashboard-access-routing.module';
import { LoginPageComponent } from './pages/login/login-page.component';
import { RegisterPageComponent } from './pages/register/register-page.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardAccessRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
  declarations: [LoginPageComponent, RegisterPageComponent],
})
export class DashboardAccessModule {}
