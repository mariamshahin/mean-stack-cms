import { createAction, props } from '@ngrx/store';
import { User } from 'app/shared/models/data.model';

export enum AdminActionsTypes {
  AuthUser = '[Auth] Authenticate User',
  UpdateUser = '[Auth] Update User',
  SyncStorageState = '[Auth] Sync Storage State',
}

export const authUser = createAction(
  AdminActionsTypes.AuthUser,
  props<{
    data: User;
  }>()
);

export const updateUser = createAction(
  AdminActionsTypes.UpdateUser,
  props<{
    data: User;
  }>()
);
