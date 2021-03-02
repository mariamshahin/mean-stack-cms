import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterStateGuard } from 'app/core/guards/router-state.guard';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AccountComponent } from './pages/account/account.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'account',
        component: AccountComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [RouterStateGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
