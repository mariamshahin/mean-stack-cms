import { createReducer, on, Action } from '@ngrx/store';
import { updateSuccess, updateFail } from './update-profile.actions';

export const featureKey = 'updateProfile';

export interface State {
  response: string;
  error: string;
}

export const initialState: Readonly<State> = {
  response: null,
  error: null,
};

export const profileReducer = createReducer(
  initialState,
  on(updateSuccess, (state, { response }) => ({
    ...state,
    response,
  })),
  on(updateFail, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(
  state: State = initialState,
  action: Action
): Readonly<State> {
  return profileReducer(state, action);
}
