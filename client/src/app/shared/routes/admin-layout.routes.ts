import { Routes } from '@angular/router';

// Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const ADMIN_ROUTES: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('app/modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('app/modules/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('app/modules/posts/posts.module').then((m) => m.PostsModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('app/modules/drafts/drafts.module').then((m) => m.DraftsModule),
  },
  {
    path: '**',
    redirectTo: 'admin',
  },
];
