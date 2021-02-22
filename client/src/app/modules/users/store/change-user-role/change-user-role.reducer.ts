import { createReducer, on, Action } from '@ngrx/store';
import { changeRoleSuccess } from './change-user-role.actions';
import { User } from 'app/shared/models/data.model';

export const featureKey = 'changeUserRole';

export interface State {
  user;
}

export const initialState: Readonly<State> = {
  user: null,
};

export const roleReducer = createReducer(
  initialState,
  on(changeRoleSuccess, (state, { user }) => ({
    ...state,
    user,
  }))
);

export function reducer(
  state: State = initialState,
  action: Action
): Readonly<State> {
  return roleReducer(state, action);
}
