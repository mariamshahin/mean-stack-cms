import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';

import { FULL_ROUTES } from './routes/full-layout.routes';
import { ADMIN_ROUTES } from './routes/admin-layout.routes';

import { AuthGuard } from './core/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin/dashboard',
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
