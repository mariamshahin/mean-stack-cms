import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  featureKey,
  reducerToken,
  reducerProvider,
  moduleEffects,
} from './store';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { LoginPageComponent } from './pages/login/login-page.component';
import { RegisterPageComponent } from './pages/register/register-page.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    StoreModule.forFeature(featureKey, reducerToken),
    EffectsModule.forFeature(moduleEffects),
  ],
  declarations: [LoginPageComponent, RegisterPageComponent],
  providers: [reducerProvider],
})
export class DashboardModule {}
