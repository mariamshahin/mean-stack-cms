import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { DataTableColumn, Role, UserData } from 'app/shared/models/data.model';
import { selectAdmin } from 'app/modules/admin/store';
import { ModalComponent } from 'app/shared/components/ui-elements/modal/modal.component';
import { selectPublic } from '../../store';
import { viewPosts } from '../../store/view-all-posts/view-all-posts.actions';

@Component({
  selector: 'app-view-all-posts',
  templateUrl: './view-all-posts.component.html',
  styleUrls: ['./view-all-posts.component.scss'],
})
export class ViewAllPostsComponent implements OnInit {
  postsData$ = this.store.pipe(
    select(selectPublic),
    map((state) => state.viewAllPosts.posts)
  );

  constructor(
    @Inject('API_BASE_URL') public apiUrl: string,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(viewPosts());
  }
}
