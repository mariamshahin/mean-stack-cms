import { createReducer, on, Action } from '@ngrx/store';
import { User } from 'app/shared/models/data.model';
import { registerSuccess, registerFail } from './register.actions';

export const featureKey = 'register';

export interface State {
  data: User;
  error: string;
}

export const initialState: Readonly<State> = {
  data: null,
  error: null,
};

export const registerReducer = createReducer(
  initialState,
  on(registerSuccess, (state, { data }) => ({
    ...state,
    data,
  })),
  on(registerFail, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(
  state: State = initialState,
  action: Action
): Readonly<State> {
  return registerReducer(state, action);
}
