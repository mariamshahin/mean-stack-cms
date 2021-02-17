import { Routes } from '@angular/router';

// Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const ADMIN_ROUTES: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('app/modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '**',
    redirectTo: 'admin',
  },
];
