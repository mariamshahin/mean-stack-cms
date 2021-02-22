import { createAction, props } from '@ngrx/store';
import { User } from 'app/shared/models/data.model';

export enum UserActionsTypes {
  ViewSingleUser = '[Users] View Single User',
  ViewSingleUserSuccess = '[Users] View Single User Success',
  DeleteUser = '[Users] Delete User',
}

export const viewSingleUser = createAction(
  UserActionsTypes.ViewSingleUser,
  props<{
    id: number;
  }>()
);

export const userSuccess = createAction(
  UserActionsTypes.ViewSingleUserSuccess,
  props<{
    user;
  }>()
);

export const deleteUser = createAction(
  UserActionsTypes.DeleteUser,
  props<{
    id: number;
  }>()
);
