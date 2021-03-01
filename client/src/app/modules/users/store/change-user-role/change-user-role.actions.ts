import { createAction, props } from '@ngrx/store';
import { UserData } from 'app/shared/models/data.model';

export enum ChangeUserRoleActionsTypes {
  ChangeUserRole = '[Users] Change User Role',
  ChangeUserRoleSuccess = '[Users] Change User Role Success',
  ChangeUserRoleFail = '[Users] Change User Role Fail',
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
    user: UserData;
  }>()
);

export const changeRoleFail = createAction(
  ChangeUserRoleActionsTypes.ChangeUserRoleFail,
  props<{
    error: string;
  }>()
);
