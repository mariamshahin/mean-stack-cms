import { createReducer, on, Action } from '@ngrx/store';

import { registerSuccess, registerFail } from './register.actions';

export const featureKey = 'register';

export interface State {
  response: string;
  error: string;
}

export const initialState: Readonly<State> = {
  response: null,
  error: null,
};

export const registerReducer = createReducer(
  initialState,
  on(registerSuccess, (state, { response }) => ({
    ...state,
    response,
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
