import {
  Component,
  ViewEncapsulation,
  TemplateRef,
  ViewChild,
  Inject,
  OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { DataTableColumn } from 'app/shared/models/data.model';
import { UsersState, selectUsers } from '../../store';
import { viewUsers } from '../../store/view-all-users/view-all-users.actions';

@Component({
  selector: 'app-view-all-users',
  templateUrl: './view-all-users.component.html',
  styleUrls: [
    './view-all-users.component.scss',
    '../../../../../assets/sass/libs/datatables.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ViewAllUsersComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('avatar', { static: true }) avatar: TemplateRef<any>;

  usersData$ = this.store.pipe(
    select(selectUsers),
    map((state) => state.viewAllUsers.users)
  );

  ColumnMode = ColumnMode;
  limitRef = 10;
  columns: DataTableColumn[];

  constructor(
    @Inject('API_BASE_URL') public apiUrl: string,
    private store: Store<UsersState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(viewUsers());
    this.columns = [
      {
        prop: 'username',
        cellTemplate: this.avatar,
        minWidth: 150,
      },
      { prop: 'email' },
      { prop: 'full_name', name: 'Full Name' },
      { prop: 'role' },
    ];
  }
}
