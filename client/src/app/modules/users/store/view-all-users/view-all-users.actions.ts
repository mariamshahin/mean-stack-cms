import { createAction, props } from '@ngrx/store';
import { User } from 'app/shared/models/data.model';

export enum ViewUsersActionsTypes {
  ViewUsers = '[Users] View Users',
  ViewUsersSuccess = '[Users] View Users Success',
  ViewUsersFail = '[Users] View Users Fail',
}

export const viewUsers = createAction(ViewUsersActionsTypes.ViewUsers);

export const usersSuccess = createAction(
  ViewUsersActionsTypes.ViewUsersSuccess,
  props<{
    users: User[];
  }>()
);

export const usersFail = createAction(
  ViewUsersActionsTypes.ViewUsersFail,
  props<{
    error: string;
  }>()
);
