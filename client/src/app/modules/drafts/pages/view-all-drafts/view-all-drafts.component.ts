import {
  Component,
  ViewEncapsulation,
  TemplateRef,
  ViewChild,
  Inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { DataTableColumn, Role, UserData } from 'app/shared/models/data.model';
import { selectAdmin } from 'app/modules/admin/store';
import { ModalComponent } from 'app/shared/components/ui-elements/modal/modal.component';
import { selectDrafts } from '../../store';
import {
  viewDrafts,
  deleteDraft,
} from '../../store/view-all-drafts/view-all-drafts.actions';

@Component({
  selector: 'app-view-all-drafts',
  templateUrl: './view-all-drafts.component.html',
  styleUrls: [
    './view-all-drafts.component.scss',
    '../../../../../assets/sass/libs/datatables.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ViewAllDraftsComponent implements OnInit, OnDestroy {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('deleteDraftModal') deleteDraftModal: ModalComponent;
  @ViewChild('rowHeader', { static: true }) rowHeader: TemplateRef<any>;
  @ViewChild('avatar', { static: true }) avatar: TemplateRef<any>;
  @ViewChild('date', { static: true }) date: TemplateRef<any>;
  @ViewChild('content', { static: true }) content: TemplateRef<any>;
  @ViewChild('user', { static: true }) user: TemplateRef<any>;

  ColumnMode = ColumnMode;
  limitRef = 10;
  columns: DataTableColumn[];
  userSub: Subscription;
  draftsSub: Subscription;
  rowData: any;
  userData: UserData;

  userData$ = this.store.pipe(
    select(selectAdmin),
    map((state) => state.auth.data.user)
  );

  draftsData$ = this.store.pipe(
    select(selectDrafts),
    map((state) => state.viewAllDrafts.drafts)
  );

  constructor(
    @Inject('API_BASE_URL') public apiUrl: string,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(viewDrafts());
    this.userSub = this.userData$.subscribe(
      (userData) => (this.userData = userData)
    );
    this.draftsSub = this.draftsData$.subscribe(() => {
      this.deleteDraftModal?.close();
    });

    this.columns = [
      {
        prop: '',
        name: '',
        cellTemplate: this.rowHeader,
        maxWidth: 100,
        minWidth: 100,
      },
      {
        prop: 'title',
        cellTemplate: this.avatar,
        minWidth: 250,
      },
      { prop: 'content', cellTemplate: this.content, minWidth: 300 },
      {
        prop: 'created_at',
        name: 'Create Date',
        cellTemplate: this.date,
        minWidth: 150,
      },
      {
        prop: 'updated_at',
        name: 'Last Update',
        cellTemplate: this.date,
        minWidth: 150,
      },
    ];

    if (this.userData.role === (Role.admin || Role.author)) {
      this.columns = [
        ...this.columns,
        {
          prop: 'user',
          cellTemplate: this.user,
          minWidth: 150,
        },
      ];
    }
  }

  openDeleteModal(event, row) {
    event.target.closest('datatable-body-cell').blur();
    this.rowData = row;
    return this.deleteDraftModal.open();
  }

  submitDeleteDraft() {
    this.store.dispatch(
      deleteDraft({
        id: this.rowData?._id,
      })
    );
  }

  ngOnDestroy() {
    this.deleteDraftModal?.close();
    this.userSub.unsubscribe();
  }
}
