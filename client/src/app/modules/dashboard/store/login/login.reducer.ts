import { createReducer, on, Action } from '@ngrx/store';
import { loginSuccess, loginFail, updateUser } from './login.actions';
import { User } from 'app/shared/models/data.model';

export const featureKey = 'login';

export interface State {
  data: User;
  error: string;
}

export const initialState: Readonly<State> = {
  data: null,
  error: null,
};

export const loginReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { data }) => ({
    ...state,
    data,
  })),
  on(loginFail, (state, { error }) => ({
    ...state,
    error,
  })),
  on(updateUser, (state, { data }) => ({
    ...state,
    data: { ...state.data, user: { ...state.data.user, ...data } },
  }))
);

export function reducer(
  state: State = initialState,
  action: Action
): Readonly<State> {
  return loginReducer(state, action);
}
