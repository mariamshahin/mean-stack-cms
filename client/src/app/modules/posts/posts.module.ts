import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveComponentModule } from '@ngrx/component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { QuillModule } from 'ngx-quill';
import { PostsRoutingModule } from './posts-routing.module';
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
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { UpdatePostComponent } from './pages/update-post/update-post.component';

@NgModule({
  imports: [
    CommonModule,
    PostsRoutingModule,
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
    ViewAllPostsComponent,
    CreatePostComponent,
    UpdatePostComponent,
  ],
  providers: [reducerProvider],
})
export class PostsModule {}
