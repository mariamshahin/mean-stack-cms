import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAllUsersComponent } from './pages/view-all-users/view-all-users.component';
import { ViewSingleUserComponent } from './pages/view-single-user/view-single-user.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'users',
        component: ViewAllUsersComponent,
      },
      {
        path: 'users/:id',
        component: ViewSingleUserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
