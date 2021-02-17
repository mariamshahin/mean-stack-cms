import { InjectionToken } from '@angular/core';
import {
  combineReducers,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  ActionReducer,
} from '@ngrx/store';
import * as formRegister from './register/register.reducer';
import * as formLogin from './login/login.reducer';
import { RegisterEffects } from './register/register.effects';
import { LoginEffects } from './login/login.effects';

export const featureKey = 'dashboard';

export interface DashboardState {
  [formRegister.featureKey]: formRegister.State;
  [formLogin.featureKey]: formLogin.State;
}

export const reducers = combineReducers({
  [formRegister.featureKey]: formRegister.reducer,
  [formLogin.featureKey]: formLogin.reducer,
});

export const reducerToken = new InjectionToken<
  ActionReducerMap<DashboardState>
>(featureKey);

export function getReducers(): ActionReducer<DashboardState> {
  return reducers;
}

export const reducerProvider = [
  { provide: reducerToken, useFactory: getReducers },
];

export const selectDashboard = createFeatureSelector<DashboardState>(
  featureKey
);

export const moduleState = createSelector(selectDashboard, (state) => state);

export const moduleEffects = [RegisterEffects, LoginEffects];
