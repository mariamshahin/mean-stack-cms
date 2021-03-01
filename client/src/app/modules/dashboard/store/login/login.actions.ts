import { createAction, props } from '@ngrx/store';
import { Login } from '../../dashboard.model';
import { User, Route } from 'app/shared/models/data.model';

export enum LoginActionsTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFail = '[Auth] Login Fail',
  Logout = '[Auth] Logout',
}

export const login = createAction(
  LoginActionsTypes.Login,
  props<{
    payload: Login;
  }>()
);

export const loginSuccess = createAction(
  LoginActionsTypes.LoginSuccess,
  props<{
    data: User;
    route?: Route;
  }>()
);

export const loginFail = createAction(
  LoginActionsTypes.LoginFail,
  props<{
    error: string;
  }>()
);

export const logout = createAction(LoginActionsTypes.Logout);
