import { Routes } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const FULL_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('app/modules/dashboard-access/dashboard-access.module').then(
        (m) => m.DashboardAccessModule
      ),
  },
];
