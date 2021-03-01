import { createReducer, on, Action } from '@ngrx/store';
import { userSuccess, userFail } from './view-single-user.actions';
import { User } from 'app/shared/models/data.model';

export const featureKey = 'viewSingleUser';

export interface State {
  user: any;
  error: string;
}

export const initialState: Readonly<State> = {
  user: null,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(userSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(userFail, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(
  state: State = initialState,
  action: Action
): Readonly<State> {
  return userReducer(state, action);
}
