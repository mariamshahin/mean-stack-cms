import { createAction, props } from '@ngrx/store';

export enum RegisterActionsTypes {
  Register = '[Auth] Register',
  RegisterSuccess = '[Auth] Register Success',
  RegisterFail = '[Auth] Register Fail',
}

export const register = createAction(
  RegisterActionsTypes.Register,
  props<{
    username: string;
    email: string;
    password: string;
    confirm_password: string;
  }>()
);

export const registerSuccess = createAction(
  RegisterActionsTypes.RegisterSuccess,
  props<{
    response: string;
  }>()
);

export const registerFail = createAction(
  RegisterActionsTypes.RegisterFail,
  props<{
    error: string;
  }>()
);
