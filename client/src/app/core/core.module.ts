import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'app/shared/shared.module';
import { interceptorProviders } from './interceptors';
import { AdminModule } from 'app/modules/admin/admin.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    NgxSpinnerModule,
    SharedModule,
    AdminModule,
  ],
  providers: [interceptorProviders],
})
export class CoreModule {}
