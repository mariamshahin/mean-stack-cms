import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FullPagesRoutingModule } from './full-pages-routing.module';
import { LoginPageComponent } from './login/login-page.component';

@NgModule({
  imports: [
    CommonModule,
    FullPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginPageComponent],
})
export class FullPagesModule {}
