import { createAction, props } from '@ngrx/store';

export const REGISTER = '[Auth] Register';
export const LOGIN = '[Auth] Login';

export const register = createAction(
  REGISTER,
  props<{ username: string; password: string }>()
);

export const login = createAction(
  LOGIN,
  props<{ username: string; password: string }>()
);
