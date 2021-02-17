import { createAction, props } from '@ngrx/store';
import { Profile, Password } from '../../admin.model';

export enum ChangePasswordActionsTypes {
  Change = '[Change Password] Change',
  ChangeSuccess = '[Change Password] Change Success',
  ChangeFail = '[Change Password] Change Fail',
}

export const changePassword = createAction(
  ChangePasswordActionsTypes.Change,
  props<{
    payload: Password;
  }>()
);

export const changeSuccess = createAction(
  ChangePasswordActionsTypes.ChangeSuccess,
  props<{
    response: string;
  }>()
);

export const changeFail = createAction(
  ChangePasswordActionsTypes.ChangeFail,
  props<{
    error: string;
  }>()
);
