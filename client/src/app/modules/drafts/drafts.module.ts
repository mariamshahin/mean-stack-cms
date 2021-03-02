import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveComponentModule } from '@ngrx/component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { QuillModule } from 'ngx-quill';
import { DraftsRoutingModule } from './drafts-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import {
  featureKey,
  reducerToken,
  reducerProvider,
  moduleEffects,
} from './store';

// Components

// Pages
import { ViewAllDraftsComponent } from './pages/view-all-drafts/view-all-drafts.component';
import { CreateDraftComponent } from './pages/create-draft/create-draft.component';
import { UpdateDraftComponent } from './pages/update-draft/update-draft.component';

@NgModule({
  imports: [
    CommonModule,
    DraftsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
    NgxDatatableModule,
    QuillModule,
    StoreModule.forFeature(featureKey, reducerToken),
    EffectsModule.forFeature(moduleEffects),
  ],
  declarations: [
    ViewAllDraftsComponent,
    CreateDraftComponent,
    UpdateDraftComponent,
  ],
  providers: [reducerProvider],
})
export class DraftsModule {}
