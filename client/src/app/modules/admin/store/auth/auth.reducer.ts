import { createReducer, on, Action } from '@ngrx/store';
import { authUser, updateUser } from './auth.actions';
import { User } from 'app/shared/models/data.model';

export const featureKey = 'auth';

export interface State {
  data: User;
}

export const initialState: Readonly<State> = {
  data: null,
};

export const authAdminReducer = createReducer(
  initialState,
  on(authUser, (state, { data }) => ({
    ...state,
    data,
  })),
  on(updateUser, (state, { data }) => ({
    ...state,
    data: { ...state.data, user: { ...state.data.user, ...data } },
  }))
);

export function reducer(
  state: State = initialState,
  action: Action
): Readonly<State> {
  return authAdminReducer(state, action);
}
