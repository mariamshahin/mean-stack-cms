import { createAction, props } from '@ngrx/store';

export const register = createAction(
  '[Auth] Register',
  props<{
    username: string;
    email: string;
    password: string;
    confirm_password: string;
  }>()
);

// export const login = createAction(
//   '[Auth] Login',
//   props<{ username: string; password: string }>()
// );
