import { Component, Inject, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { currentRouteState } from 'app/store';
import { Subscription } from 'rxjs';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { DataTableColumn, Role } from 'app/shared/models/data.model';
import { selectUsers } from '../../store';
import { ModalComponent } from 'app/shared/components/ui-elements/modal/modal.component';
import {
  viewSingleUser,
  deleteUser,
} from '../../store/view-single-user/view-single-user.actions';
import { changeUserRole } from '../../store/change-user-role/change-user-role.actions';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent implements OnInit, OnDestroy {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('changeRoleModal') changeRoleModal: ModalComponent;
  @ViewChild('deleteUserModal') deleteUserModal: ModalComponent;

  routeSub: Subscription;
  userSub: Subscription;
  roleSub: Subscription;
  ColumnMode = ColumnMode;
  userData: any;
  routeParams: { [key: string]: any };
  columns: DataTableColumn[];
  roles = Object.values(Role);

  routerData$ = this.store.pipe(
    select(currentRouteState),
    map((state) => state)
  );

  userData$ = this.store.pipe(
    select(selectUsers),
    map((state) => state.viewSingleUser.user)
  );

  roleData$ = this.store.pipe(
    select(selectUsers),
    map((state) => state.changeUserRole.user)
  );

  changeRoleForm = new FormGroup({
    role: new FormControl('', Validators.required),
  });

  constructor(
    @Inject('API_BASE_URL') public apiUrl: string,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.routeSub = this.routerData$.subscribe((route: any) => {
      this.routeParams = route.params;
    });
    this.userSub = this.userData$.subscribe((user) => {
      if (user) {
      }
      this.userData = user;
    });
    this.roleSub = this.roleData$.subscribe(() => {
      this.changeRoleModal?.close();
    });
    this.store.dispatch(viewSingleUser({ id: this.routeParams?.id }));
  }

  get crf() {
    return this.changeRoleForm;
  }

  openRoleModal() {
    return this.changeRoleModal.open();
  }

  openDeleteModal() {
    return this.deleteUserModal.open();
  }

  submitChangeRole() {
    if (
      this.changeRoleForm.invalid ||
      !this.changeRoleForm.dirty ||
      this.changeRoleForm.value.role === this.userData.role
    ) {
      return;
    }
    this.store.dispatch(
      changeUserRole({
        id: this.routeParams?.id,
        data: this.changeRoleForm.value,
      })
    );
  }

  submitDeleteUser() {
    this.store.dispatch(
      deleteUser({
        id: this.routeParams?.id,
      })
    );
  }

  ngOnDestroy(): void {
    this.changeRoleModal?.close();
    this.deleteUserModal?.close();
    this.routeSub.unsubscribe();
    this.userSub.unsubscribe();
    this.roleSub.unsubscribe();
  }
}
