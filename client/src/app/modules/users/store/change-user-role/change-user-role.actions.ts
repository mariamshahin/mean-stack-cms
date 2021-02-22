import { createAction, props } from '@ngrx/store';
import { User } from 'app/shared/models/data.model';

export enum ChangeUserRoleActionsTypes {
  ChangeUserRole = '[Users] Change User Role',
  ChangeUserRoleSuccess = '[Users] Change User Role Success',
}

export const changeUserRole = createAction(
  ChangeUserRoleActionsTypes.ChangeUserRole,
  props<{
    data: any;
    id: number;
  }>()
);

export const changeRoleSuccess = createAction(
  ChangeUserRoleActionsTypes.ChangeUserRoleSuccess,
  props<{
    user;
  }>()
);
