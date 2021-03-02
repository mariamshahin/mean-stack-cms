import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAllPostsComponent } from './pages/view-all-posts/view-all-posts.component';
import { ViewSinglePostComponent } from './pages/view-single-post/view-single-post.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'posts',
        component: ViewAllPostsComponent,
      },
      {
        path: 'posts/:id',
        component: ViewSinglePostComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
