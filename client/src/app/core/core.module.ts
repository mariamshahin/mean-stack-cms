import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'app/shared/shared.module';
import { interceptorProviders } from './interceptors';
import { DashboardModule } from 'app/modules/dashboard/dashboard.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    NgxSpinnerModule,
    SharedModule,
    DashboardModule,
  ],
  providers: [interceptorProviders],
})
export class CoreModule {}
