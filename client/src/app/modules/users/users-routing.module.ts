import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewUsersComponent } from './pages/view-all-users/view-users.component';
import { ViewUserComponent } from './pages/view-single-user/view-user.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'users',
        component: ViewUsersComponent,
      },
      {
        path: 'users/:id',
        component: ViewUserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
