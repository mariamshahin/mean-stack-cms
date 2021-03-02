import { Routes } from '@angular/router';

// Route for content layout with sidebar, navbar and footer.

export const FULL_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('app/modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('app/modules/public/public.module').then((m) => m.PublicModule),
  },
];
