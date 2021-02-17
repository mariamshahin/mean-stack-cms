import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { AdminLayoutComponent } from './core/layouts/admin/admin-layout.component';
import { FullLayoutComponent } from './core/layouts/full/full-layout.component';

import { FULL_ROUTES } from './shared/routes/full-layout.routes';
import { ADMIN_ROUTES } from './shared/routes/admin-layout.routes';

import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    children: FULL_ROUTES,
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: ADMIN_ROUTES,
    // roles: string[] required in module routing data for auth guard
    canActivateChild: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'pages/error',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
