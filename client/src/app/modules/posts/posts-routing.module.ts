import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAllPostsComponent } from './pages/view-all-posts/view-all-posts.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { UpdatePostComponent } from './pages/update-post/update-post.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'posts',
        component: ViewAllPostsComponent,
      },
      {
        path: 'create-post',
        component: CreatePostComponent,
      },
      {
        path: 'posts/:id',
        component: UpdatePostComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
