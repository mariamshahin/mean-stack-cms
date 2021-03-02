import { createReducer, on, Action } from '@ngrx/store';
import { changeRoleSuccess, changeRoleFail } from './change-user-role.actions';
import { UserData } from 'app/shared/models/data.model';

export const featureKey = 'changeUserRole';

export interface State {
  user: UserData;
  error: string;
}

export const initialState: Readonly<State> = {
  user: null,
  error: null,
};

export const roleReducer = createReducer(
  initialState,
  on(changeRoleSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(changeRoleFail, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(
  state: State = initialState,
  action: Action
): Readonly<State> {
  return roleReducer(state, action);
}
