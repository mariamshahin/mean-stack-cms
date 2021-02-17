import { createReducer, on, Action } from '@ngrx/store';
import { changeSuccess, changeFail } from './change-password.actions';

export const featureKey = 'changePassword';

export interface State {
  response: string;
  error: string;
}

export const initialState: Readonly<State> = {
  response: null,
  error: null,
};

export const passwordReducer = createReducer(
  initialState,
  on(changeSuccess, (state, { response }) => ({
    ...state,
    response,
  })),
  on(changeFail, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(
  state: State = initialState,
  action: Action
): Readonly<State> {
  return passwordReducer(state, action);
}
