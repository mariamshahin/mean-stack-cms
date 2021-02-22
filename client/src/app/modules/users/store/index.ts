import { InjectionToken } from '@angular/core';
import {
  combineReducers,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  ActionReducer,
} from '@ngrx/store';
import * as formUsers from './view-users/view-users.reducer';
import * as formUser from './view-single-user/view-single-user.reducer';
import * as formRole from './change-user-role/change-user-role.reducer';
import { UsersEffects } from './view-users/view-users.effects';
import { UserEffects } from './view-single-user/view-single-user.effects';
import { RoleEffects } from './change-user-role/change-user-role.effects';

export const featureKey = 'users';

export interface UsersState {
  [formUsers.featureKey]: formUsers.State;
  [formUser.featureKey]: formUser.State;
  [formRole.featureKey]: formRole.State;
}

export const reducers = combineReducers({
  [formUsers.featureKey]: formUsers.reducer,
  [formUser.featureKey]: formUser.reducer,
  [formRole.featureKey]: formRole.reducer,
});

export const reducerToken = new InjectionToken<ActionReducerMap<UsersState>>(
  featureKey
);

export function getReducers(): ActionReducer<UsersState> {
  return reducers;
}

export const reducerProvider = [
  { provide: reducerToken, useFactory: getReducers },
];

export const selectUsers = createFeatureSelector<UsersState>(featureKey);

export const moduleState = createSelector(selectUsers, (state) => state);

export const moduleEffects = [UsersEffects, UserEffects, RoleEffects];
