import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveComponentModule } from '@ngrx/component';
import { QuillModule } from 'ngx-quill';
import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import {
  featureKey,
  reducerToken,
  reducerProvider,
  moduleEffects,
} from './store';

// Components

// Pages
import { ViewAllPostsComponent } from './pages/view-all-posts/view-all-posts.component';
import { ViewSinglePostComponent } from './pages/view-single-post/view-single-post.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    PublicRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
    QuillModule,
    StoreModule.forFeature(featureKey, reducerToken),
    EffectsModule.forFeature(moduleEffects),
  ],
  declarations: [ViewAllPostsComponent, ViewSinglePostComponent],
  providers: [reducerProvider],
})
export class PublicModule {}
