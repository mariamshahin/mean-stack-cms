import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveComponentModule } from '@ngrx/component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import {
  featureKey,
  reducerToken,
  reducerProvider,
  moduleEffects,
} from './store';

// Components

// Pages
import { ViewAllUsersComponent } from './pages/view-all-users/view-all-users.component';
import { ViewSingleUserComponent } from './pages/view-single-user/view-single-user.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
    NgxDatatableModule,
    StoreModule.forFeature(featureKey, reducerToken),
    EffectsModule.forFeature(moduleEffects),
  ],
  declarations: [ViewAllUsersComponent, ViewSingleUserComponent],
  providers: [reducerProvider],
})
export class UsersModule {}
