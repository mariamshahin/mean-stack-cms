import { createReducer, on, Action } from '@ngrx/store';
import { userSuccess } from './view-single-user.actions';
import { User } from 'app/shared/models/data.model';

export const featureKey = 'viewSingleUser';

export interface State {
  user;
}

export const initialState: Readonly<State> = {
  user: null,
};

export const userReducer = createReducer(
  initialState,
  on(userSuccess, (state, { user }) => ({
    ...state,
    user,
  }))
);

export function reducer(
  state: State = initialState,
  action: Action
): Readonly<State> {
  return userReducer(state, action);
}
