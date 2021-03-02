import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAllDraftsComponent } from './pages/view-all-drafts/view-all-drafts.component';
import { CreateDraftComponent } from './pages/create-draft/create-draft.component';
import { UpdateDraftComponent } from './pages/update-draft/update-draft.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'drafts',
        component: ViewAllDraftsComponent,
      },
      {
        path: 'create-draft',
        component: CreateDraftComponent,
      },
      {
        path: 'drafts/:id',
        component: UpdateDraftComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DraftsRoutingModule {}
