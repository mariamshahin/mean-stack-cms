import { createAction, props } from '@ngrx/store';
import { User } from 'app/shared/models/data.model';
import { Register } from '../../dashboard.model';

export enum RegisterActionsTypes {
  Register = '[Auth] Register',
  RegisterSuccess = '[Auth] Register Success',
  RegisterFail = '[Auth] Register Fail',
}

export const register = createAction(
  RegisterActionsTypes.Register,
  props<{
    payload: Register;
  }>()
);

export const registerSuccess = createAction(
  RegisterActionsTypes.RegisterSuccess,
  props<{
    data: User;
  }>()
);

export const registerFail = createAction(
  RegisterActionsTypes.RegisterFail,
  props<{
    error: string;
  }>()
);
