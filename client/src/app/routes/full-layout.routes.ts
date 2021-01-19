import { Routes } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const FULL_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('app/pages/full-pages/full-pages.module').then(
        (m) => m.FullPagesModule
      ),
  },
];
