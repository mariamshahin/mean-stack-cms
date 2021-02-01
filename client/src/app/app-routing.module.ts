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
    redirectTo: 'dashboard/register',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: { title: 'full Views' },
    children: FULL_ROUTES,
  },
  {
    path: '',
    component: AdminLayoutComponent,
    data: { title: 'admin Views' },
    children: ADMIN_ROUTES,
   // canActivate: [AuthGuard],
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
