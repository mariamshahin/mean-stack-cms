import { createReducer, on, Action } from '@ngrx/store';
import { usersSuccess } from './view-users.actions';
import { User } from 'app/shared/models/data.model';

export const featureKey = 'viewUsers';

export interface State {
  users: User[];
}

export const initialState: Readonly<State> = {
  users: null,
};

export const usersReducer = createReducer(
  initialState,
  on(usersSuccess, (state, { users }) => ({
    ...state,
    users,
  }))
);

export function reducer(
  state: State = initialState,
  action: Action
): Readonly<State> {
  return usersReducer(state, action);
}
