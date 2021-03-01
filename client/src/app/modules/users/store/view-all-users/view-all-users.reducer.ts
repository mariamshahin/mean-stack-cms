import { createReducer, on, Action } from '@ngrx/store';
import { usersSuccess, usersFail } from './view-all-users.actions';
import { User } from 'app/shared/models/data.model';

export const featureKey = 'viewAllUsers';

export interface State {
  users: User[];
  error: string;
}

export const initialState: Readonly<State> = {
  users: null,
  error: null,
};

export const usersReducer = createReducer(
  initialState,
  on(usersSuccess, (state, { users }) => ({
    ...state,
    users,
  })),
  on(usersFail, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(
  state: State = initialState,
  action: Action
): Readonly<State> {
  return usersReducer(state, action);
}
