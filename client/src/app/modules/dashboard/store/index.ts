import { InjectionToken } from '@angular/core';
import {
  combineReducers,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as formRegister from './register/register.reducer';
import { RegisterEffects } from './register/register.effects';

export const featureKey = 'dashboard';

export interface DashboardState {
  [formRegister.featureKey]: formRegister.State;
}

export const reducers = combineReducers({
  [formRegister.featureKey]: formRegister.reducer,
});

export const reducerToken = new InjectionToken<
  ActionReducerMap<DashboardState>
>(featureKey);

export function getReducers() {
  return reducers;
}

export const reducerProvider = [
  { provide: reducerToken, useFactory: getReducers },
];

export const selectDashboard = createFeatureSelector<DashboardState>(
  featureKey
);

export const moduleState = createSelector(selectDashboard, (state) => state);

export const moduleEffects = [RegisterEffects];
