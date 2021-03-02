import { createAction, props } from '@ngrx/store';
import { User, UserData } from 'app/shared/models/data.model';

export enum UserActionsTypes {
  ViewSingleUser = '[Users] View Single User',
  ViewSingleUserSuccess = '[Users] View Single User Success',
  ViewSingleUserFail = '[Users] View Single User Fail',
  DeleteUser = '[Users] Delete User',
  DeleteUserSuccess = '[Users] Delete User Success',
  DeleteUserFail = '[Users] Delete User Fail',
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
    user: any;
  }>()
);

export const userFail = createAction(
  UserActionsTypes.ViewSingleUserFail,
  props<{
    error: string;
  }>()
);

export const deleteUser = createAction(
  UserActionsTypes.DeleteUser,
  props<{
    id: number;
  }>()
);

export const deleteSuccess = createAction(
  UserActionsTypes.DeleteUserSuccess,
  props<{
    response: string;
  }>()
);

export const deleteFail = createAction(
  UserActionsTypes.DeleteUserFail,
  props<{
    error: string;
  }>()
);
